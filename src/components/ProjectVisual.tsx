import type { ProjectVisual as ProjectVisualType } from '../data/projects'

const colors = {
  // All diagram colors resolve from CSS variables so the SVGs follow the
  // active theme. Values live in src/index.css under --pv-*.
  node: 'var(--pv-node)',
  nodeSoft: 'var(--pv-node-soft)',
  stroke: 'var(--pv-stroke)',
  strokeStrong: 'var(--pv-stroke-strong)',
  line: 'var(--pv-line)',
  accent: 'var(--pv-accent)',
  text: 'var(--pv-text)',
  muted: 'var(--pv-muted)',
  dim: 'var(--pv-dim)',
  accentBorder: 'var(--pv-accent-border)',
  accentBorderSoft: 'var(--pv-accent-border-2)',
  leafFill: 'var(--pv-leaf-fill)',
  leafStroke: 'var(--pv-leaf-stroke)',
}

interface ProjectVisualProps {
  type: ProjectVisualType
}

export function ProjectVisual({ type }: ProjectVisualProps) {
  if (type === 'rag') return <RagDiagram />
  if (type === 'leaf') return <LeafDiagram />
  return <CoderDiagram />
}

function NodeLabel({ x, y, children }: { x: number; y: number; children: string }) {
  return (
    <text
      x={x}
      y={y}
      fill={colors.muted}
      fontSize="11"
      fontFamily="var(--font-mono)"
      letterSpacing="1.3"
    >
      {children}
    </text>
  )
}

function RagDiagram() {
  return (
    <svg
      viewBox="0 0 640 380"
      className="h-auto w-full"
      role="presentation"
      aria-hidden="true"
      focusable="false"
    >
      <defs>
        <marker
          id="rag-arrow"
          viewBox="0 0 10 10"
          refX="8"
          refY="5"
          markerWidth="5"
          markerHeight="5"
          orient="auto-start-reverse"
        >
          <path d="M 0 0 L 10 5 L 0 10 z" fill={colors.line} />
        </marker>
      </defs>

      <NodeLabel x={32} y={45}>
        SOURCES
      </NodeLabel>
      <NodeLabel x={246} y={45}>
        RETRIEVAL
      </NodeLabel>
      <NodeLabel x={460} y={45}>
        GENERATION
      </NodeLabel>

      {/* Source cards */}
      <g>
        <rect x="32" y="64" width="170" height="66" rx="8" fill={colors.node} stroke={colors.stroke} />
        <rect x="46" y="78" width="22" height="28" rx="2" fill={colors.nodeSoft} stroke={colors.strokeStrong} />
        <path d="M51 86h12M51 92h9M51 98h11" stroke={colors.accent} strokeWidth="1.1" opacity="0.7" />
        <text x="80" y="88" fill={colors.text} fontSize="14.5" fontWeight="600" fontFamily="var(--font-sans)">
          FAQ
        </text>
        <text x="80" y="106" fill={colors.muted} fontSize="10.5" fontFamily="var(--font-mono)">
          CSV · 1 row = 1 doc
        </text>
      </g>

      <g>
        <rect x="32" y="152" width="170" height="66" rx="8" fill={colors.node} stroke={colors.stroke} />
        <rect x="46" y="166" width="22" height="28" rx="2" fill={colors.nodeSoft} stroke={colors.strokeStrong} />
        <path d="M51 174h12M51 180h9M51 186h11" stroke={colors.strokeStrong} />
        <text x="80" y="176" fill={colors.text} fontSize="14.5" fontWeight="600" fontFamily="var(--font-sans)">
          Tickets
        </text>
        <text x="80" y="194" fill={colors.muted} fontSize="10.5" fontFamily="var(--font-mono)">
          SQLite · resolved
        </text>
      </g>

      <g>
        <rect x="32" y="240" width="170" height="66" rx="8" fill={colors.node} stroke={colors.stroke} />
        <rect x="46" y="254" width="22" height="28" rx="2" fill={colors.nodeSoft} stroke={colors.strokeStrong} />
        <path d="M51 262h12M51 268h9M51 274h11" stroke={colors.strokeStrong} />
        <text
          x="80"
          y="264"
          fill={colors.text}
          fontSize="14.5"
          fontWeight="600"
          fontFamily="var(--font-sans)"
        >
          Guide
        </text>
        <text x="80" y="282" fill={colors.muted} fontSize="10.5" fontFamily="var(--font-mono)">
          PDF · chunks 600/100
        </text>
      </g>

      <line x1="202" y1="97" x2="240" y2="97" stroke={colors.line} markerEnd="url(#rag-arrow)" />
      <line x1="202" y1="185" x2="240" y2="185" stroke={colors.line} markerEnd="url(#rag-arrow)" />
      <line x1="202" y1="273" x2="240" y2="273" stroke={colors.line} markerEnd="url(#rag-arrow)" />

      {/* Vector store */}
      <g>
        <rect x="246" y="64" width="170" height="242" rx="10" fill={colors.node} stroke={colors.accentBorder} />
        <text x="262" y="92" fill={colors.text} fontSize="14.5" fontWeight="600" fontFamily="var(--font-sans)">
          ChromaDB
        </text>
        <text x="262" y="108" fill={colors.muted} fontSize="10.5" fontFamily="var(--font-mono)">
          3 collections
        </text>

        {[
          { y: 120, label: 'faq' },
          { y: 166, label: 'tickets' },
          { y: 212, label: 'guides' },
        ].map((row) => (
          <g key={row.label}>
            <rect
              x="262"
              y={row.y}
              width="138"
              height="36"
              rx="6"
              fill={colors.nodeSoft}
              stroke={colors.stroke}
            />
            {[0, 1, 2, 3].map((dot) => (
              <circle
                key={dot}
                cx={276 + (dot % 2) * 7}
                cy={row.y + 14 + Math.floor(dot / 2) * 8}
                r="1.6"
                fill={dot === 0 ? colors.accent : colors.strokeStrong}
              />
            ))}
            <text
              x="296"
              y={row.y + 22}
              fill={colors.muted}
              fontSize="11"
              fontFamily="var(--font-mono)"
              letterSpacing="0.8"
            >
              {row.label}
            </text>
            <text
              x="388"
              y={row.y + 22}
              fill={colors.dim}
              fontSize="10"
              fontFamily="var(--font-mono)"
              textAnchor="end"
            >
              k=3
            </text>
          </g>
        ))}

        <text x="262" y="288" fill={colors.accent} fontSize="10.5" fontFamily="var(--font-mono)" letterSpacing="0.8">
          merged · 9 docs / query
        </text>
      </g>

      <line x1="416" y1="130" x2="454" y2="130" stroke={colors.line} markerEnd="url(#rag-arrow)" />

      {/* Generation */}
      <g>
        <rect x="460" y="84" width="148" height="92" rx="9" fill={colors.node} stroke={colors.accentBorder} />
        <text x="474" y="120" fill={colors.text} fontSize="14.5" fontWeight="600" fontFamily="var(--font-sans)">
          Qwen3-32B
        </text>
        <text x="474" y="138" fill={colors.muted} fontSize="10.5" fontFamily="var(--font-mono)">
          via OpenRouter
        </text>
        <text x="474" y="158" fill={colors.accent} fontSize="9.5" fontFamily="var(--font-mono)" letterSpacing="0.6">
          temperature 0
        </text>
      </g>

      <path d="M534 176 V218" fill="none" stroke={colors.line} markerEnd="url(#rag-arrow)" />

      <g>
        <rect x="460" y="224" width="148" height="82" rx="9" fill={colors.node} stroke={colors.stroke} />
        <text x="474" y="256" fill={colors.text} fontSize="14.5" fontWeight="600" fontFamily="var(--font-sans)">
          Answer
        </text>
        <text x="474" y="274" fill={colors.muted} fontSize="10.5" fontFamily="var(--font-mono)">
          grounded in context
        </text>
        <text x="474" y="292" fill={colors.dim} fontSize="9.5" fontFamily="var(--font-mono)">
          cites [FAQ] [TICKET] [GUIDE]
        </text>
      </g>

      <text x="32" y="344" fill={colors.dim} fontSize="10.5" fontFamily="var(--font-mono)" letterSpacing="0.9">
        LANGCHAIN · 3 CHROMA COLLECTIONS → QWEN3-32B
      </text>
    </svg>
  )
}

function LeafDiagram() {
  return (
    <svg
      viewBox="0 0 640 380"
      className="h-auto w-full"
      role="presentation"
      aria-hidden="true"
      focusable="false"
    >
      <defs>
        <marker
          id="leaf-arrow"
          viewBox="0 0 10 10"
          refX="8"
          refY="5"
          markerWidth="5"
          markerHeight="5"
          orient="auto-start-reverse"
        >
          <path d="M 0 0 L 10 5 L 0 10 z" fill={colors.line} />
        </marker>
      </defs>

      <NodeLabel x={32} y={44}>
        IMAGE INPUT
      </NodeLabel>
      <NodeLabel x={292} y={44}>
        MODEL
      </NodeLabel>
      <NodeLabel x={466} y={44}>
        PREDICTION
      </NodeLabel>

      <rect
        x="32"
        y="66"
        width="224"
        height="248"
        rx="10"
        fill={colors.nodeSoft}
        stroke={colors.stroke}
      />
      <rect x="32" y="66" width="224" height="28" rx="10" fill={colors.node} />
      <rect x="32" y="83" width="224" height="11" fill={colors.node} />
      <text x="46" y="84" fill={colors.muted} fontSize="10.5" fontFamily="var(--font-mono)" letterSpacing="1">
        LEAF.JPG
      </text>
      <text x="212" y="84" fill={colors.accent} fontSize="9.5" fontFamily="var(--font-mono)" letterSpacing="0.8">
        UPLOAD
      </text>

      <g stroke={colors.strokeStrong} fill="none">
        <path d="M48 112V96h16M240 112V96h-16M48 268v16h16M240 268v16h-16" />
      </g>

      <g>
        <path
          d="M117 279 C91 247 87 198 112 159 C137 120 181 100 219 109 C225 151 214 201 191 239 C169 274 143 288 117 279 Z"
          fill={colors.leafFill}
          stroke={colors.leafStroke}
          strokeWidth="1.3"
        />
        <path
          d="M121 275 C140 225 164 174 211 117"
          fill="none"
          stroke={colors.accent}
          strokeOpacity="0.65"
          strokeWidth="1"
        />
        <path d="M144 226 C135 211 131 197 131 180" fill="none" stroke={colors.accent} strokeOpacity="0.4" />
        <path d="M157 203 C153 189 153 176 157 161" fill="none" stroke={colors.accent} strokeOpacity="0.4" />
        <path d="M173 177 C174 163 179 151 186 141" fill="none" stroke={colors.accent} strokeOpacity="0.4" />
        <path d="M144 226 C155 214 165 209 178 208" fill="none" stroke={colors.accent} strokeOpacity="0.4" />
        <path d="M157 203 C169 192 181 187 193 186" fill="none" stroke={colors.accent} strokeOpacity="0.4" />
      </g>

      <line
        x1="60"
        y1="206"
        x2="228"
        y2="206"
        stroke={colors.accent}
        strokeOpacity="0.38"
        strokeDasharray="2 6"
      />
      <circle cx="152" cy="206" r="2.5" fill={colors.accent} />
      <text x="60" y="298" fill={colors.dim} fontSize="11.5" fontFamily="var(--font-mono)" letterSpacing="0.8">
        PREPROCESSED FOR MODEL INPUT
      </text>

      <line x1="256" y1="190" x2="284" y2="190" stroke={colors.line} markerEnd="url(#leaf-arrow)" />

      <g>
        <rect
          x="292"
          y="140"
          width="100"
          height="100"
          rx="10"
          fill={colors.node}
          stroke={colors.accentBorderSoft}
        />
        {Array.from({ length: 16 }).map((_, index) => {
          const column = index % 4
          const row = Math.floor(index / 4)
          const isAccent = [5, 6, 9, 10].includes(index)
          return (
            <rect
              key={index}
              x={309 + column * 17}
              y={157 + row * 17}
              width="10"
              height="10"
              rx="1.5"
              fill={isAccent ? colors.accent : colors.strokeStrong}
              opacity={isAccent ? 0.85 : 0.7}
            />
          )
        })}
        <text
          x="342"
          y="255"
          textAnchor="middle"
          fill={colors.muted}
          fontSize="11.5"
          fontFamily="var(--font-mono)"
          letterSpacing="0.6"
        >
          VISION TRANSFORMER
        </text>
      </g>

      <path d="M392 190 H428" fill="none" stroke={colors.line} markerEnd="url(#leaf-arrow)" />
      <path d="M428 190 V118 H462" fill="none" stroke={colors.line} markerEnd="url(#leaf-arrow)" />
      <path d="M428 190 H462" fill="none" stroke={colors.line} markerEnd="url(#leaf-arrow)" />
      <path d="M428 190 V262 H462" fill="none" stroke={colors.line} markerEnd="url(#leaf-arrow)" />

      <g>
        {[
          { y: 90, label: 'Healthy', index: '01' },
          { y: 162, label: 'Early blight', index: '02' },
          { y: 234, label: 'Late blight', index: '03' },
        ].map((item) => (
          <g key={item.label}>
            <rect
              x="466"
              y={item.y}
              width="142"
              height="56"
              rx="8"
              fill={colors.node}
              stroke={colors.stroke}
            />
            <rect x="480" y={item.y + 20} width="15" height="15" rx="3" fill="none" stroke={colors.strokeStrong} />
            <circle cx="487.5" cy={item.y + 27.5} r="2" fill={colors.accent} opacity="0.75" />
            <text
              x="506"
              y={item.y + 25}
              fill={colors.text}
              fontSize="15"
              fontWeight="600"
              fontFamily="var(--font-sans)"
            >
              {item.label}
            </text>
            <text
              x="506"
              y={item.y + 40}
              fill={colors.dim}
              fontSize="9.5"
              fontFamily="var(--font-mono)"
              letterSpacing="0.8"
            >
              CLASS {item.index}
            </text>
          </g>
        ))}
      </g>

      <text x="32" y="344" fill={colors.dim} fontSize="10.5" fontFamily="var(--font-mono)" letterSpacing="0.9">
        FLASK APP · IMAGE UPLOAD · SERVER-SIDE INFERENCE
      </text>
    </svg>
  )
}

function CoderDiagram() {
  return (
    <svg
      viewBox="0 0 640 380"
      className="h-auto w-full"
      role="presentation"
      aria-hidden="true"
      focusable="false"
    >
      <defs>
        <marker
          id="coder-arrow"
          viewBox="0 0 10 10"
          refX="8"
          refY="5"
          markerWidth="5"
          markerHeight="5"
          orient="auto-start-reverse"
        >
          <path d="M 0 0 L 10 5 L 0 10 z" fill={colors.line} />
        </marker>
        <marker
          id="coder-arrow-accent"
          viewBox="0 0 10 10"
          refX="8"
          refY="5"
          markerWidth="5"
          markerHeight="5"
          orient="auto-start-reverse"
        >
          <path d="M 0 0 L 10 5 L 0 10 z" fill={colors.accent} />
        </marker>
      </defs>

      <NodeLabel x={32} y={45}>
        TRAINING
      </NodeLabel>

      <g>
        <rect x="32" y="64" width="118" height="78" rx="8" fill={colors.node} stroke={colors.stroke} />
        <text x="46" y="94" fill={colors.text} fontSize="14.5" fontWeight="600" fontFamily="var(--font-sans)">
          Data
        </text>
        <text x="46" y="112" fill={colors.muted} fontSize="10.5" fontFamily="var(--font-mono)">
          HF datasets
        </text>
        <text x="46" y="128" fill={colors.dim} fontSize="9.5" fontFamily="var(--font-mono)">
          ~1 GB code
        </text>
      </g>

      <line x1="150" y1="103" x2="162" y2="103" stroke={colors.line} markerEnd="url(#coder-arrow)" />

      <g>
        <rect x="164" y="64" width="118" height="78" rx="8" fill={colors.node} stroke={colors.stroke} />
        <text x="178" y="94" fill={colors.text} fontSize="14.5" fontWeight="600" fontFamily="var(--font-sans)">
          Tokenizer
        </text>
        <text x="178" y="112" fill={colors.muted} fontSize="10.5" fontFamily="var(--font-mono)">
          BPE · 32k
        </text>
        <text x="178" y="128" fill={colors.accent} fontSize="9.5" fontFamily="var(--font-mono)">
          FIM tokens
        </text>
      </g>

      <line x1="282" y1="103" x2="294" y2="103" stroke={colors.line} markerEnd="url(#coder-arrow)" />

      <g>
        <rect x="296" y="64" width="118" height="78" rx="8" fill={colors.node} stroke={colors.stroke} />
        <text x="310" y="94" fill={colors.text} fontSize="14.5" fontWeight="600" fontFamily="var(--font-sans)">
          Shards
        </text>
        <text x="310" y="112" fill={colors.muted} fontSize="10.5" fontFamily="var(--font-mono)">
          uint16
        </text>
        <text x="310" y="128" fill={colors.dim} fontSize="9.5" fontFamily="var(--font-mono)">
          np.memmap
        </text>
      </g>

      <line x1="414" y1="103" x2="426" y2="103" stroke={colors.line} markerEnd="url(#coder-arrow)" />

      <g>
        <rect x="428" y="64" width="180" height="78" rx="9" fill={colors.node} stroke={colors.accentBorder} />
        <text x="442" y="94" fill={colors.text} fontSize="14.5" fontWeight="600" fontFamily="var(--font-sans)">
          GPT · 42M params
        </text>
        <text x="442" y="112" fill={colors.muted} fontSize="10.5" fontFamily="var(--font-mono)">
          8L · 1024 ctx · fp16
        </text>
        <text x="442" y="128" fill={colors.accent} fontSize="9.5" fontFamily="var(--font-mono)" letterSpacing="0.6">
          FIM · PSM/SPM
        </text>
      </g>

      <path
        d="M518 142 V180 H289 V214"
        fill="none"
        stroke={colors.accent}
        strokeOpacity="0.55"
        strokeDasharray="3 4"
        markerEnd="url(#coder-arrow-accent)"
      />
      <text x="526" y="170" fill={colors.muted} fontSize="9.5" fontFamily="var(--font-mono)">
        checkpoint
      </text>

      <line x1="32" y1="178" x2="608" y2="178" stroke={colors.stroke} strokeDasharray="2 5" />

      <NodeLabel x={32} y={206}>
        GENERATION
      </NodeLabel>

      <g>
        <rect x="32" y="224" width="150" height="78" rx="8" fill={colors.node} stroke={colors.stroke} />
        <text x="46" y="254" fill={colors.text} fontSize="14.5" fontWeight="600" fontFamily="var(--font-sans)">
          Prompt
        </text>
        <text x="46" y="272" fill={colors.muted} fontSize="10.5" fontFamily="var(--font-mono)">
          signature or gap
        </text>
      </g>

      <line x1="182" y1="263" x2="210" y2="263" stroke={colors.line} markerEnd="url(#coder-arrow)" />

      <g>
        <rect x="214" y="224" width="150" height="78" rx="8" fill={colors.node} stroke={colors.stroke} />
        <text x="228" y="254" fill={colors.text} fontSize="14.5" fontWeight="600" fontFamily="var(--font-sans)">
          Sampling
        </text>
        <text x="228" y="272" fill={colors.muted} fontSize="10.5" fontFamily="var(--font-mono)">
          top-k · nucleus
        </text>
      </g>

      <line x1="364" y1="263" x2="392" y2="263" stroke={colors.line} markerEnd="url(#coder-arrow)" />

      <g>
        <rect x="396" y="224" width="212" height="78" rx="9" fill={colors.node} stroke={colors.stroke} />
        <text x="410" y="254" fill={colors.text} fontSize="14.5" fontWeight="600" fontFamily="var(--font-sans)">
          Completion
        </text>
        <text x="410" y="272" fill={colors.muted} fontSize="10.5" fontFamily="var(--font-mono)">
          KV-cached decode
        </text>
        <text x="410" y="288" fill={colors.dim} fontSize="9.5" fontFamily="var(--font-mono)">
          one-shot · batch · REPL
        </text>
      </g>

      <text x="32" y="344" fill={colors.dim} fontSize="10.5" fontFamily="var(--font-mono)" letterSpacing="0.9">
        PYTORCH FROM SCRATCH · RMSNORM · SWIGLU · WEIGHT TIED
      </text>
    </svg>
  )
}
