export type ProjectVisual = 'rag' | 'leaf' | 'coder'

export interface DetailItem {
  title: string
  detail: string
}

export interface ProjectFigure {
  src: string
  alt: string
  caption: string
  /** Short label shown in the corner of project cards. */
  cardCaption: string
}

export interface Project {
  slug: string
  index: string
  name: string
  category: string
  summary: string
  tags: string[]
  visual: ProjectVisual
  visualCaption: string
  figure?: ProjectFigure
  role: string
  focus: string
  status: string
  repoUrl: string
  demoUrl: string
  caseStudy: {
    overview: string[]
    problem: string[]
    contribution: string[]
    approach: DetailItem[]
    decisions: DetailItem[]
    challenges: DetailItem[]
    validation: string[]
    outcomes: string[]
  }
}

export const projects: Project[] = [
  {
    slug: 'potato-disease-detection',
    index: '01',
    name: 'Potato Disease Detection System Using ViT',
    category: 'Applied ML · Computer vision',
    summary:
      'A Flask web application that classifies potato leaf images — healthy, early blight, or late blight — with a fine-tuned Vision Transformer, batch analysis, and PDF/CSV report export.',
    tags: ['Python', 'PyTorch', 'Hugging Face Transformers', 'Vision Transformer', 'Flask', 'ReportLab'],
    visual: 'leaf',
    visualCaption: 'Image classification flow',
    figure: {
      src: '/projects/potato-architecture.jpg',
      alt: 'Two-phase system architecture diagram: training pipeline on top, web inference pipeline below',
      caption: 'System architecture — training pipeline and web inference flow, the actual flow implemented in the project',
      cardCaption: 'System architecture',
    },
    role: 'Solo project · Model training & web application',
    focus: 'ViT fine-tuning, image pipeline, Flask interface',
    status: 'Public repository',
    repoUrl: 'https://github.com/pavandeepb/Potato-Disease-Detection-System-Using-ViT',
    demoUrl: '',
    caseStudy: {
      overview: [
        'Potato Disease Detection System is a computer-vision web application that classifies a potato leaf image into one of three classes: healthy, early blight (Alternaria solani), or late blight (Phytophthora infestans). I fine-tuned a Vision Transformer — google/vit-base-patch16-224-in21k from Hugging Face — and placed it behind a Flask workflow that accepts uploads or camera captures and returns a labeled prediction with a confidence score.',
        'The project connects the full path: training script, checkpoint with class mapping, Flask API, and a browser interface with batch analysis and PDF/CSV report export.',
      ],
      problem: [
        'Leaf disease identification is visual work that benefits from a consistent second opinion, especially early in an infection when symptoms are subtle.',
        'The project packages an image classifier into a usable workflow — multiple input methods, batch analysis, and shareable reports — rather than a single prediction demo.',
      ],
      contribution: [
        'I built the project end to end: the training script (ViT fine-tuning with augmentation and validation), the inference service, the Flask backend with batch prediction and report endpoints, and the front-end interface with drag-and-drop upload, camera capture, previews, and export controls.',
        'Training starts from an ImageNet-21k pretrained ViT and adapts it to three labels with AdamW at a 2e-5 learning rate, batch size 8, for 10 epochs, tracking training and validation accuracy each epoch.',
      ],
      approach: [
        {
          title: 'Fine-tune the ViT',
          detail:
            'train.py fine-tunes google/vit-base-patch16-224-in21k with num_labels=3 on an ImageFolder dataset (train/val). Training uses horizontal flips, ±15° rotations, and normalization, with CrossEntropyLoss and per-epoch training/validation accuracy logged to a plot.',
        },
        {
          title: 'Checkpoint with class mapping',
          detail:
            'The saved checkpoint stores the model state dict, optimizer state, and the class_to_idx mapping — so the application reads class names from the checkpoint instead of hard-coding them.',
        },
        {
          title: 'Serve predictions',
          detail:
            'The Flask app (/predict) accepts one or many files, preprocesses them with ViTImageProcessor, runs softmax inference for a confidence percentage, and returns the label, confidence, disease details (description, symptoms, recommended action), and an inline preview. Images are processed in memory and not stored.',
        },
        {
          title: 'Export reports',
          detail:
            'The /export endpoint generates a PDF report (ReportLab, with an fpdf2 fallback path) or a CSV with one row per image: filename, prediction, confidence, description, symptoms, and recommended action.',
        },
        {
          title: 'Browser interface',
          detail:
            'The interface supports drag-and-drop uploads, a file browser, and camera capture via getUserMedia (rear-camera preference on mobile, canvas frame capture). Multiple images are analyzed together with a progress state, and results render as cards with color-coded confidence badges.',
        },
      ],
      decisions: [
        {
          title: 'A ViT backbone instead of a small CNN',
          detail:
            'The project deliberately uses an attention-based vision model, starting from ImageNet-21k pretrained weights rather than training from scratch — appropriate for a 3-class dataset of this size.',
        },
        {
          title: 'Class names live in the checkpoint',
          detail:
            'Persisting class_to_idx with the weights keeps the training-time label order and the inference-time label names in sync.',
        },
        {
          title: 'One batch-capable endpoint',
          detail:
            'A single /predict route handles both single and batch analysis, so the web flow and the API stay aligned.',
        },
        {
          title: 'Reports as a first-class output',
          detail:
            'PDF/CSV export turns predictions into something that can be archived or shared — the difference between a demo and a usable tool.',
        },
      ],
      challenges: [
        {
          title: 'The trained weights are not in the repository',
          detail:
            'The model checkpoint is about 982 MB, which is beyond GitHub file limits, so the repo ships the training script and links an external download. The in-app auto-download URL is a placeholder that must be filled in before the app can fetch the model by itself.',
        },
        {
          title: 'Similar classes are the hard part',
          detail:
            'Early and late blight can present similarly in photographs, particularly under inconsistent lighting or at an early infection stage.',
        },
        {
          title: 'Field photos differ from dataset images',
          detail:
            'Background, framing, focus, and lighting shift the model input in ways the clean validation split may not represent.',
        },
      ],
      validation: [
        'Training logs per-epoch training and validation accuracy and saves an accuracy plot (train.py) — the evaluation metric lives in the training pipeline, not in an unverifiable claim.',
        'No accuracy or latency figures are published on this site. The trained checkpoint and evaluation outputs are not committed to the repository, so there is nothing in the repo that could be independently verified — and a number that cannot be checked does not belong on a portfolio.',
        'The web flow — upload, camera capture, batch analysis, PDF and CSV export — is implemented in templates/index.html and app.py and can be exercised locally once a checkpoint is available.',
      ],
      outcomes: [
        'A complete repository covering training, inference, and reporting — not just a model notebook.',
        'A Flask application with genuine input options (file, drag-and-drop, camera) and batch processing.',
        'A documented setup path: dataset structure, training command, and API endpoints.',
      ],
    },
  },
  {
    slug: 'coder-llm',
    index: '02',
    name: 'Coder-LLM',
    category: 'AI · Language model from scratch',
    summary:
      'A GPT-style, decoder-only code language model trained entirely from scratch in PyTorch — custom BPE tokenizer, Fill-in-the-Middle training, a generation CLI, and a benchmark evaluation script.',
    tags: ['Python', 'PyTorch', 'Hugging Face Tokenizers', 'Accelerate', 'NumPy', 'CUDA · fp16'],
    visual: 'coder',
    visualCaption: 'Training and generation pipeline',
    figure: {
      src: '/projects/coder-llm-pipeline.png',
      alt: 'Pipeline diagram from the Coder-LLM repository: download data, train tokenizer, preprocess, train, generate, evaluate',
      caption: 'Training pipeline — from raw code files to a code-completion model',
      cardCaption: 'Training pipeline',
    },
    role: 'Solo project · Architecture, tokenizer, training, inference',
    focus: 'Transformer internals, FIM training, sampling',
    status: 'Public repository',
    repoUrl: 'https://github.com/pavandeepb/coder-llm',
    demoUrl: '',
    caseStudy: {
      overview: [
        'Coder-LLM is a GPT-style, decoder-only transformer for code completion that I built from scratch in PyTorch — no pretrained weights and no fine-tuning of an existing model. Every component is implemented in the repository: the model architecture, the BPE tokenizer, the data pipeline, the training loop, and the generation CLI.',
        'The model is tuned for a 6 GB laptop GPU (NVIDIA RTX 3050): about 42 million parameters, a 1,024-token context window, and a 32,000-token vocabulary. Its distinguishing feature is Fill-in-the-Middle (FIM) training, the technique behind Copilot-style completions, so it can fill a gap between a function signature and the code that follows it — not only continue from the end of a file.',
      ],
      problem: [
        'Using a code model is normal; understanding what is actually inside one is not. The project exists to close that gap: implement a transformer for code end to end and be able to explain every layer, every training decision, and every sampling step.',
        'The second goal is practical: produce completions at the cursor position — completing the middle of a file — which plain causal language-model training does not explicitly teach.',
      ],
      contribution: [
        'I implemented the entire pipeline: model.py (attention, MLP, normalization, weight initialization), the BPE tokenizer training script with FIM and language-tag tokens, the preprocessing path to memory-mapped binary shards, the FIM collator, the training loop, checkpointing, the generation CLI, and the evaluation script.',
        'I also tuned the whole configuration (model size, batch size, sequence length, mixed precision, gradient checkpointing) for a 6 GB VRAM budget, and documented scaling options for larger GPUs.',
      ],
      approach: [
        {
          title: 'The model (model.py)',
          detail:
            'A decoder-only transformer: RMSNorm pre-normalization, causal self-attention with a fused QKV projection and PyTorch scaled_dot_product_attention (Flash Attention where available), a SwiGLU MLP, learned absolute positional embeddings, and weight tying between the token embedding and the LM head. Initialization follows the GPT-2 scheme with residual scaling.',
        },
        {
          title: 'Tokenizer',
          detail:
            'A Byte-Pair Encoding tokenizer is trained on the code corpus with Hugging Face tokenizers: 32,000 tokens, plus special tokens for FIM (<fim_prefix>, <fim_suffix>, <fim_middle>), document separation, and language tags (<|python|>, <|javascript|>, and others) so the model knows which language it is working in.',
        },
        {
          title: 'Data pipeline',
          detail:
            'Code is collected from Hugging Face datasets (CodeParrot-clean and CodeSearchNet, about 1 GB combined) plus OpenAI\u2019s HumanEval problems for evaluation. Files are tokenized into flat uint16 binary shards with a 99.5/0.5 train/val split and read through NumPy memory-mapping, so the full corpus is never loaded into RAM.',
        },
        {
          title: 'Fill-in-the-Middle training',
          detail:
            'Half of the training batches are transformed by a FIM collator: a middle span is cut from 1,024-token code windows and the model learns to predict it given the prefix and suffix, using the PSM and SPM orderings (50/50), following the fill-in-the-middle training paper (Bavarian et al., 2022). The other half stays plain causal LM so normal next-token ability is preserved.',
        },
        {
          title: 'Training loop (train.py)',
          detail:
            'Hugging Face Accelerate drives the loop: AdamW with parameter groups (no weight decay on biases and norm parameters), a cosine learning-rate schedule with linear warm-up, gradient accumulation, gradient clipping, optional gradient checkpointing, fp16 mixed precision, periodic validation, and checkpoint save/resume with pruning. Weights & Biases logging is optional.',
        },
        {
          title: 'Generation and evaluation',
          detail:
            'generate.py loads a checkpoint and samples with temperature, top-k, nucleus (top-p), and repetition penalty controls, with KV-cached decoding, one-shot, batch-file, and interactive REPL modes. eval_code.py computes syntax pass rate, HumanEval pass@k (running generated completions against test suites in subprocesses), and perplexity.',
        },
      ],
      decisions: [
        {
          title: 'From scratch, deliberately',
          detail:
            'Pretraining nothing and reusing nothing is the point: the architecture, training loop, and sampler are all in the repository and readable line by line.',
        },
        {
          title: 'FIM at 50% of batches',
          detail:
            'A 50% FIM rate teaches middle-insertion completion while keeping the model capable of ordinary continuation. PSM and SPM orderings are split evenly, as described in the reference paper.',
        },
        {
          title: 'Size the model to the hardware',
          detail:
            '42M parameters with a 32k vocabulary is a deliberate fit for 6 GB of VRAM: small enough to train overnight, large enough to learn real code patterns. The README documents exact scaling steps for 85M and 350M configurations.',
        },
        {
          title: 'Memory-mapped data over in-RAM loading',
          detail:
            'Training samples random windows from flat binary shards via np.memmap, so a 1 GB tokenized corpus costs almost nothing in RAM.',
        },
        {
          title: 'Sampling controls exposed in the CLI',
          detail:
            'Temperature, top-k, top-p, and repetition penalty are all adjustable at generation time, with guidance for code (low temperature for deterministic completions).',
        },
      ],
      challenges: [
        {
          title: 'Six gigabytes is a tight budget',
          detail:
            'Batch size, sequence length, fp16, and gradient checkpointing all exist to fit training into a 6 GB laptop GPU without running out of memory.',
        },
        {
          title: 'Windows-specific friction',
          detail:
            'DataLoader workers must be disabled on Windows, and file handling needed explicit UTF-8. Both are handled in the code and documented in the README\u2019s troubleshooting section.',
        },
        {
          title: 'A small model has honest limits',
          detail:
            'At 42M parameters the model learns syntax, indentation, and common patterns; it is not a substitute for large hosted models, and the repository says so instead of overclaiming.',
        },
      ],
      validation: [
        'The training loop reports step loss, learning rate, tokens/sec, and periodic validation loss; checkpoints include optimizer state so runs are resumable and reproducible.',
        'eval_code.py measures syntax pass rate, HumanEval pass@k, and validation perplexity — metrics defined and computed by the repository itself.',
        'No benchmark results are published on this site: the repository documents target ranges, not measured outcomes, and the final trained checkpoint is not committed.',
      ],
      outcomes: [
        'A complete, reproducible pipeline: data download, tokenizer training, preprocessing, FIM training, generation, and evaluation — every stage a script in the repo.',
        'A working code-completion workflow in the Copilot style: give a signature, get a body; give a gap, get the middle.',
        'Checkpointed training that can be resumed, and a documented path to scale the architecture up.',
      ],
    },
  },
  {
    slug: 'rag-telecom-chatbot',
    index: '03',
    name: 'RAG Telecom Chatbot',
    category: 'AI · Retrieval-augmented generation',
    summary:
      'A customer-care chatbot for telecom support that retrieves context from three knowledge sources — FAQ entries, resolved tickets, and a guide PDF — before generating grounded answers with Qwen3-32B.',
    tags: ['Python', 'LangChain', 'ChromaDB', 'sentence-transformers', 'Streamlit', 'Qwen3-32B'],
    visual: 'rag',
    visualCaption: 'Retrieval-augmented answer flow',
    role: 'Solo project · Retrieval pipeline & application',
    focus: 'Multi-source retrieval, grounded prompt design, chat UI',
    status: 'Public repository',
    repoUrl: 'https://github.com/pavandeepb/rag-telecom-chatbot',
    demoUrl: '',
    caseStudy: {
      overview: [
        'RAG Telecom Chatbot is a retrieval-augmented generation application for telecom customer care. It answers questions about mobile connectivity, billing, SIM issues, and roaming — but only from material it retrieves: FAQ entries, previously resolved support tickets, and a telecom user guide.',
        'The chain merges three ChromaDB vector collections into one retriever, formats the retrieved passages with source labels, and sends them to Qwen3-32B for a grounded answer. The project ships both a Streamlit chat interface and a command-line client, plus the ingestion scripts that build the vector store from the raw data files.',
      ],
      problem: [
        'Support chatbots are only trustworthy when their answers trace back to real policy, real documentation, or real resolved cases — not to what a language model remembers.',
        'The project demonstrates the full retrieval-augmented pattern: keep the knowledge in owned, inspectable sources; retrieve per question; generate strictly from what was retrieved; and hand off to a human channel when the context is insufficient.',
      ],
      contribution: [
        'I built the complete application: three ingestion scripts (FAQ CSV, SQLite ticket database, PDF guide with chunking), the merged retriever over three Chroma collections, the LangChain chain with its system prompt, and both the Streamlit UI and CLI.',
        'I chose the embedding model (a local sentence-transformers model) and the generation model (Qwen3-32B through an OpenAI-compatible API), designed the prompt that constrains answers to the retrieved context, and added a documented fallback (call 611 or use the app) when the context does not contain an answer.',
      ],
      approach: [
        {
          title: 'Three sources, three collections',
          detail:
            'FAQ rows (one document per row), resolved tickets from a SQLite database (one document per ticket), and a telecom guide PDF (split into 600-character chunks with 100-character overlap using LangChain\u2019s RecursiveCharacterTextSplitter). Each source is embedded into its own ChromaDB collection and persisted to disk.',
        },
        {
          title: 'Merged retrieval',
          detail:
            'A retriever queries all three collections and merges the results — top 3 from each, 9 context documents per question. Embeddings run locally with sentence-transformers/all-MiniLM-L6-v2.',
        },
        {
          title: 'Grounded generation',
          detail:
            'Retrieved documents are labeled with their source ([FAQ], [TICKET], [GUIDE]) and inserted into a system prompt that instructs the model to use only that context and to say so when it cannot answer. Generation uses Qwen3-32B (qwen/qwen3-32b) through an OpenAI-compatible endpoint at temperature 0 for deterministic, repeatable answers.',
        },
        {
          title: 'Two interfaces',
          detail:
            'A Streamlit chat app with sample questions, conversation history, and a clear-conversation control — answers stream token-by-token. A CLI (main.py) exposes the same chain with streamed output for quick testing.',
        },
      ],
      decisions: [
        {
          title: 'Local embeddings, hosted generation',
          detail:
            'The embedding model runs on the local machine, so indexing the knowledge base has no API dependency; only the final generation step calls a hosted model.',
        },
        {
          title: 'One collection per source',
          detail:
            'Splitting sources keeps provenance visible in the prompt and allows the retrieval depth (k) to be tuned per source instead of globally.',
        },
        {
          title: 'Temperature 0',
          detail:
            'Support answers should be stable: the same question against the same knowledge base should not produce a different answer each time.',
        },
        {
          title: 'An explicit "not enough information" path',
          detail:
            'The system prompt defines what the model should do when retrieval comes up short — say so clearly and point the customer to the phone line or the self-service app.',
        },
      ],
      challenges: [
        {
          title: 'Mixed granularities',
          detail:
            'FAQ rows and tickets are naturally whole documents, while a PDF guide is not. The ingest scripts handle each source differently, with chunking and overlap applied only where it is needed.',
        },
        {
          title: 'Retrieval quality sets the ceiling',
          detail:
            'If the relevant passage is not retrieved, no prompt can recover it. Retrieval depth, chunk size, and the source mix are the levers that matter most.',
        },
        {
          title: 'First-run cost',
          detail:
            'The embedding model downloads on first use, so the app pre-warms the chain at startup and caches it, keeping the load step out of the first customer question.',
        },
      ],
      validation: [
        'Every retrieved document is logged into the prompt with its source label, so an answer can be traced back to the FAQ, ticket, or guide content that produced it.',
        'The repository README documents the exact data flow, ingestion commands, and retrieval depth (top 3 per collection, 9 documents per question) — all of which match the implementation.',
        'No accuracy or resolution-rate claims are published here: evaluating a support assistant properly needs a labeled question set, which is not part of the repository.',
      ],
      outcomes: [
        'A working multi-source RAG application with a chat interface and a CLI over the same chain.',
        'A repeatable ingest → embed → retrieve → generate pipeline that accepts a new knowledge source as simply as adding another collection.',
        'A grounding pattern — cite the source, admit the gap, escalate — that generalizes beyond telecom support.',
      ],
    },
  },
]

export function getProject(slug: string): Project | undefined {
  return projects.find((project) => project.slug === slug)
}
