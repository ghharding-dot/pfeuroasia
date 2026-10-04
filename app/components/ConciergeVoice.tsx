"use client";

import { useEffect, useRef, useState } from "react";
import styles from "./EuroAsiaConcierge.module.css";

type Message = { role: "user" | "assistant"; text: string };
type Answer = { answer: string };
type Props = { history: Message[]; onQuestion: (question: string) => Promise<Answer | undefined> };
type VoiceResources = {
  peer: RTCPeerConnection; channel: RTCDataChannel; microphone: MediaStream;
  controller: AbortController; timer?: ReturnType<typeof setTimeout>; idle?: ReturnType<typeof setTimeout>;
  finish?: ReturnType<typeof setTimeout>; ready?: ReturnType<typeof setTimeout>;
};

export function ConciergeVoice({ history, onQuestion }: Props) {
  const [available, setAvailable] = useState(false);
  const [state, setState] = useState<"off" | "connecting" | "live" | "ending">("off");
  const [status, setStatus] = useState("");
  const [heard, setHeard] = useState("");
  const [spoken, setSpoken] = useState("");
  const audio = useRef<HTMLAudioElement>(null);
  const latest = useRef({ history, onQuestion });
  const resources = useRef<VoiceResources | null>(null);
  const generation = useRef(0);
  useEffect(() => { latest.current = { history, onQuestion }; }, [history, onQuestion]);
  useEffect(() => {
    const controller = new AbortController();
    void fetch("/api/concierge/voice", { signal: controller.signal }).then(r => r.json()).then(r => setAvailable(r.enabled === true)).catch(() => {});
    return () => controller.abort();
  }, []);

  function cleanup() {
    generation.current++;
    const r = resources.current;
    resources.current = null;
    if (!r) return;
    r.controller.abort();
    clearTimeout(r.timer); clearTimeout(r.idle); clearTimeout(r.finish); clearTimeout(r.ready);
    r.microphone.getTracks().forEach(track => track.stop());
    r.channel.close(); r.peer.close();
    if (audio.current) { audio.current.pause(); audio.current.srcObject = null; }
  }
  function stop(reason = "Voice ended. You can continue typing.") {
    const r = resources.current;
    setStatus(reason); setState("ending");
    // Stop microphone capture immediately; retain the connection briefly to finalize usage.
    r?.microphone.getTracks().forEach(track => track.stop());
    if (r?.channel.readyState === "open") {
      r.channel.send(JSON.stringify({ type: "session.close" }));
      r.finish = setTimeout(() => { cleanup(); setState("off"); }, 5000);
    } else { cleanup(); setState("off"); }
  }
  useEffect(() => {
    function away() {
      if (document.visibilityState === "hidden") {
        const r = resources.current;
        if (r?.channel.readyState === "open") r.channel.send(JSON.stringify({ type: "session.close" }));
        cleanup(); setState("off"); setStatus("Voice ended when you left this page.");
      }
    }
    document.addEventListener("visibilitychange", away);
    return () => {
      document.removeEventListener("visibilitychange", away);
      const r = resources.current;
      if (r?.channel.readyState === "open") r.channel.send(JSON.stringify({ type: "session.close" }));
      cleanup();
    };
  }, []);

  async function start() {
    if (resources.current || state !== "off") return;
    const attempt = ++generation.current;
    setState("connecting"); setStatus("Connecting microphone…"); setHeard(""); setSpoken("");
    let microphone: MediaStream | undefined;
    try {
      if (!navigator.mediaDevices?.getUserMedia || !window.RTCPeerConnection) throw new Error("This browser does not support voice. Please type your question.");
      microphone = await navigator.mediaDevices.getUserMedia({ audio: { echoCancellation: true, noiseSuppression: true } });
      if (attempt !== generation.current) { microphone.getTracks().forEach(t => t.stop()); return; }
      const peer = new RTCPeerConnection();
      const channel = peer.createDataChannel("oai-events");
      const r: VoiceResources = { peer, channel, microphone, controller: new AbortController() };
      resources.current = r;
      const transcripts: { text: string; start: number; end: number }[] = [];
      const tasks = new Set<string>();
      let usedThrough = -1;
      let spokenText = "";
      const send = (event: Record<string, unknown>) => { if (resources.current === r && channel.readyState === "open") channel.send(JSON.stringify(event)); };
      const activity = () => {
        clearTimeout(r.idle);
        r.idle = setTimeout(() => stop("Voice ended after a quiet minute. Start again whenever you like."), 60000);
      };
      peer.ontrack = event => {
        if (audio.current && resources.current === r) {
          audio.current.srcObject = new MediaStream([event.track]);
          void audio.current.play().catch(() => setStatus("Press play below to hear EuroAsia."));
        }
      };
      peer.onconnectionstatechange = () => {
        if (resources.current === r && ["failed", "disconnected", "closed"].includes(peer.connectionState)) {
          cleanup(); setState("off"); setStatus("Voice disconnected. You can still type your question.");
        }
      };
      channel.onclose = () => { if (resources.current === r) { cleanup(); setState("off"); } };
      channel.onmessage = async ({ data }) => {
        if (resources.current !== r) return;
        let event;
        try { event = JSON.parse(data); } catch { return; }
        if (event.type === "session.started") {
          clearTimeout(r.ready); setState("live"); setStatus("Listening — ask your question."); activity();
          r.timer = setTimeout(() => stop("Your eight-minute voice session has ended. You can continue typing or start voice again."), 480000);
          send({ type: "session.instructions.append", event_id: crypto.randomUUID(), delegation_id: null, content: "Greet the visitor now in English: Hello, I am EuroAsia's AI assistant. How can I help you? Then pause and listen." });
        } else if (event.type === "session.closed") { cleanup(); setState("off"); }
        else if (event.type === "error") { stop("Voice encountered a problem. Please type your question for now."); }
        else if (event.type === "session.input_transcript.delta" && typeof event.delta === "string") {
          activity(); transcripts.push({ text: event.delta, start: event.start_ms, end: event.end_ms });
          setHeard(transcripts.filter(t => t.end > usedThrough).map(t => t.text).join("").slice(-2000));
        } else if (event.type === "session.output_transcript.delta" && typeof event.delta === "string") {
          activity(); spokenText += event.delta; setSpoken(spokenText.slice(-2000));
        } else if (event.type === "session.delegation.created" && event.delegation?.target === "client") {
          const id = event.delegation.id;
          if (typeof id !== "string" || tasks.has(id)) return;
          tasks.add(id); spokenText = ""; setSpoken("");
          // Briefly allow in-flight transcript fragments to reach the data channel.
          await new Promise(resolve => setTimeout(resolve, 300));
          if (resources.current !== r) return;
          const fragments = transcripts.filter(t => t.end > usedThrough);
          const question = fragments.map(t => t.text).join("").trim().slice(-2000);
          if (!question) {
            send({ type: "session.commentary.append", event_id: crypto.randomUUID(), delegation_id: id, content: "I did not catch the question. Please repeat it." }); return;
          }
          usedThrough = Math.max(...fragments.map(t => t.end));
          setStatus("Checking the EuroAsia website…");
          const result = await latest.current.onQuestion(question);
          if (resources.current !== r) return;
          // Discard outdated facts if the visitor corrected the request during retrieval.
          if (transcripts.some(t => t.end > usedThrough)) {
            send({ type: "session.commentary.append", event_id: crypto.randomUUID(), delegation_id: id, content: "The visitor added information while the website was being checked. Delegate the revised question before answering." });
            return;
          }
          const answer = result?.answer || "The website could not answer just now. Please try typing or select Speak with the EuroAsia team.";
          // Each context append permits 500 tokens; send bounded chunks without dropping qualifications.
          const chunks: string[] = [];
          let remaining = answer;
          while (remaining.length > 700) {
            const space = remaining.lastIndexOf(" ", 700);
            const boundary = space > 0 ? space + 1 : 700;
            chunks.push(remaining.slice(0, boundary)); remaining = remaining.slice(boundary);
          }
          if (remaining) chunks.push(remaining);
          for (const content of chunks) send({ type: "session.commentary.append", event_id: crypto.randomUUID(), delegation_id: id, content });
          setStatus("Listening — you can ask another question."); activity();
        }
      };
      microphone.getAudioTracks().forEach(track => peer.addTrack(track, microphone!));
      const offer = await peer.createOffer(); await peer.setLocalDescription(offer);
      if (peer.iceGatheringState !== "complete") await new Promise<void>((resolve, reject) => {
        const timeout = setTimeout(() => { peer.removeEventListener("icegatheringstatechange", check); reject(new Error("Voice connection timed out. Please try again.")); }, 10000);
        function check() { if (peer.iceGatheringState === "complete") { clearTimeout(timeout); peer.removeEventListener("icegatheringstatechange", check); resolve(); } }
        peer.addEventListener("icegatheringstatechange", check); check();
      });
      if (resources.current !== r) return;
      const response = await fetch("/api/concierge/voice", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ sdp: peer.localDescription?.sdp, history: latest.current.history }), signal: AbortSignal.any([r.controller.signal, AbortSignal.timeout(25000)]) });
      const result = await response.json();
      if (!response.ok) throw new Error(result.error || "Voice could not connect.");
      if (resources.current !== r) return;
      r.ready = setTimeout(() => stop("Voice could not connect. Please try typing for now."), 15000);
      await peer.setRemoteDescription({ type: "answer", sdp: result.transport.sdp });
    } catch (error) {
      microphone?.getTracks().forEach(t => t.stop());
      if (attempt !== generation.current) return;
      cleanup(); setState("off");
      setStatus(error instanceof DOMException && error.name === "NotAllowedError" ? "Microphone access was not allowed. Enable it in your browser, or type your question." : error instanceof Error ? error.message : "Voice could not connect.");
    }
  }

  if (!available) return null;
  return <div className={styles.voice}>
    <button type="button" disabled={state === "ending"} onClick={() => state === "off" ? void start() : stop()}>
      <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true"><rect x="9" y="2" width="6" height="12" rx="3"/><path d="M5 10v2a7 7 0 0 0 14 0v-2M12 19v3M8 22h8"/></svg>
      {state === "off" ? "Speak to our AI advisor" : state === "connecting" ? "Cancel voice" : state === "ending" ? "Ending voice…" : "End voice"}
    </button>
    <p role="status">{status || "Tap above to start a live voice conversation. You can also type below."}</p>
    {state !== "off" && <audio ref={audio} autoPlay controls aria-label="EuroAsia AI voice playback" />}
    {state !== "off" && heard && <p><strong>You:</strong> {heard}</p>}
    {state !== "off" && spoken && <p><strong>EuroAsia voice:</strong> {spoken}</p>}
    <p className={styles.note}>Voice is processed by OpenAI. Sessions end after eight minutes or a quiet minute. <a href="/privacy">Privacy notice</a>.</p>
  </div>;
}
