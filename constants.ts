import React from 'react';
import { ResearcherProfile, Project, NewsUpdate, Publication, AppRoute, BlogPost } from './types';

export const RESEARCHERS: ResearcherProfile[] = [
  {
    name: "Geoffrey Hinton",
    role: "Nobel Laureate / Prof @ U of Toronto",
    url: "https://www.cs.toronto.edu/~hinton/",
    description: "The 'Godfather of AI'. Key figure in Backpropagation and Neural Networks.",
    category: 'Godfather'
  },
  {
    name: "Yann LeCun",
    role: "Chief AI Scientist @ Meta",
    url: "http://yann.lecun.com",
    description: "Pioneer of CNNs. Frequently debates AI direction (World Models vs LLMs).",
    category: 'Godfather'
  },
  {
    name: "Yoshua Bengio",
    role: "Director @ Mila",
    url: "https://yoshuabengio.org",
    description: "Focuses on AI Safety, foundational research, and deep learning architectures.",
    category: 'Godfather'
  },
  {
    name: "Andrej Karpathy",
    role: "Founder / Ex-Tesla / Ex-OpenAI",
    url: "https://karpathy.github.io",
    description: "Legendary engineer. Famous for 'Unreasonable Effectiveness of RNNs' and simplifying complex concepts.",
    category: 'Blogger'
  },
  {
    name: "Lilian Weng",
    role: "VP Research @ OpenAI",
    url: "https://lilianweng.github.io",
    description: "Her blog is the definitive textbook for LLMs, Agents, and Generative AI.",
    category: 'Blogger'
  },
  {
    name: "Jay Alammar",
    role: "Visual Educator",
    url: "https://jalammar.github.io",
    description: "Best visual explanations for Transformers, BERT, and Stable Diffusion.",
    category: 'Blogger'
  },
  {
    name: "Andrew Ng",
    role: "Founder DeepLearning.AI",
    url: "https://www.andrewng.org",
    description: "The educator of the AI world. Focuses on career guidance and market trends.",
    category: 'Educator'
  },
  {
    name: "Fei-Fei Li",
    role: "Prof @ Stanford",
    url: "https://profiles.stanford.edu/fei-fei-li",
    description: "Creator of ImageNet. Pioneer of Human-centered AI.",
    category: 'Educator'
  },
  {
    name: "Chip Huyen",
    role: "MLOps Expert",
    url: "https://chiphuyen.com",
    description: "Deep expertise in Real-time ML and Machine Learning System Design.",
    category: 'Educator'
  },
  {
    name: "Chris Olah",
    role: "Interpretability Researcher",
    url: "https://colah.github.io",
    description: "Focuses on understanding how neural networks 'think'.",
    category: 'Researcher'
  },
  {
    name: "OpenAI Research",
    role: "Research Lab",
    url: "https://openai.com/research",
    description: "Home of GPT-4, Sora, and O1.",
    category: 'Lab'
  },
  {
    name: "Google DeepMind",
    role: "Research Lab",
    url: "https://deepmind.google/discover/blog",
    description: "Pioneers of AlphaGo, AlphaFold, and Gemini.",
    category: 'Lab'
  }
];

export const NEWS: NewsUpdate[] = [
  {
    date: "Oct 2025",
    content: "Participating in Kaggle Competition 'Predicting Road Accident Risk'."
  },
  {
    date: "June 2025",
    content: "Started research on ADHD prediction using fMRI connectivity matrices."
  },
  {
    date: "Jan 2025",
    content: "Published preliminary findings on automated ETL pipelines for job market analysis."
  }
];

export const PROJECTS: Project[] = [
  {
    title: "ADHD Prediction via fMRI",
    description: "Applied Deep Learning to predict ADHD using demographic data and fMRI connectivity matrices.",
    tags: ["Medical AI", "Deep Learning", "Python"]
  },
  {
    title: "Road Accident Risk Prediction",
    description: "A Kaggle competition project analyzing traffic factors to forecast accident risks.",
    tags: ["Data Analysis", "Scikit-learn", "XGBoost"]
  },
  {
    title: "Automated JD Scraper Pipeline",
    description: "Built an end-to-end pipeline to scrape and automatically update job descriptions from web sources.",
    tags: ["Data Engineering", "Automation", "ETL"]
  },
  {
    title: "Vision Studio",
    description: "Interactive image editing workbench powered by Gemini 2.5 Flash.",
    tags: ["GenAI", "Computer Vision", "React"]
  },
  {
    title: "Motion Lab",
    description: "Generative video synthesis using Veo 3.1 Fast Generate Preview.",
    tags: ["GenAI", "Video", "Veo"]
  },
  {
    title: "Live Nexus",
    description: "Real-time multimodal conversational interface using Gemini Native Audio.",
    tags: ["WebSockets", "Audio Processing", "Gemini 2.5"]
  }
];

export const PUBLICATIONS: Publication[] = [
  {
    year: "2024",
    title: "Efficient Edge Inference for Vision Transformers in Resource-Constrained Environments",
    venue: "Proceedings of CVPR Workshops"
  },
  {
    year: "2023",
    title: "Comparative Analysis of Contrastive Learning Methods for Medical Imaging",
    venue: "IEEE International Symposium on Biomedical Imaging"
  },
  {
    year: "2022",
    title: "Automated Data Pipeline Architectures for Real-time Anomaly Detection",
    venue: "International Conference on Data Engineering (ICDE)"
  }
];

export const EDUCATION = [
  {
    year: "2022 - Present",
    degree: "Ph.D. Candidate in Computer Science",
    institution: "University of Technology"
  },
  {
    year: "2020 - 2022",
    degree: "M.Sc. in Artificial Intelligence",
    institution: "Institute of Advanced Technology"
  },
  {
    year: "2016 - 2020",
    degree: "B.Eng. in Software Engineering, Honours",
    institution: "National University"
  }
];

export const DISTINCTIONS = [
  "Top 1% Kaggle Grandmaster (2024)",
  "Best Paper Award, ICDE Workshop (2023)",
  "Open Source Contributor of the Year (Neural Nexus) (2022)",
  "Google Cloud Certified Professional Machine Learning Engineer",
  "Reviewer for CVPR, ICCV, and NeurIPS Workshops"
];

// --- BLOG POST CONTENT ---
export const BLOG_POSTS: BlogPost[] = [
  {
    id: "misunderstood-children",
    title: "Có những đứa trẻ đáng thương nhưng bị đáng ghét",
    date: "Oct 2025",
    category: "Reflections",
    image: "https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?q=80&w=2566&auto=format&fit=crop",
    excerpt: "Có những người nói rằng “Đứa trẻ này thật là hư” họ có biết được câu nói đó sẽ theo các em suốt đời? Một góc nhìn về sự bao dung với trẻ thơ.",
    content: React.createElement(React.Fragment, null, 
      React.createElement("div", { className: "space-y-6 font-serif leading-relaxed text-gray-800 dark:text-gray-300" },
        React.createElement("p", { className: "italic text-sm text-gray-500" }, "By: ThangNguyen"),
        React.createElement("p", null, "Có những người nói rằng “Đứa trẻ này thật là hư” họ có biết được câu nói đó sẽ theo các em suốt đời. Chính các em là nạn nhân của xã hội đánh giá ‘vội vàng’, vội vàng phán xét, vội vàng khép mình lại với những vẻ đẹp không trọn vẹn. Ta cũng đã từng là những đứa trẻ nên hãy bao dung cho người trẻ bạn nhé!"),
        React.createElement("p", null, "Trước đây tôi có ở trọ cạnh 1 trường mẫu giáo trẻ em, khi có một em bé chập chững bước ra khi thấy tôi bên ngoài cửa, có một giọng nói của giáo viên vọng ra “con mà ra đó là chú bắt đi á”, tôi nghe câu nói xong hết hồn thật, tại sao người lớn kì vậy?, dạy trẻ em nghĩ xấu về người khác, chính những bước chân chập chững đó sau này cũng sẽ bảo rằng “ì tớ khép mình lại với thế giới này còn hơn, đi ra ngoài kia người xấu nhiều lắm”."),
        React.createElement("p", null, "Các em không xấu nhưng môi trường nơi các em đang ở đang xấu, chẳng có từ giấy trắng nào sinh ra đã đen chỉ có tác động từ bên ngoài mới khiến nó đen đi mà thôi."),
        React.createElement("h3", { className: "text-xl font-bold text-gray-900 dark:text-white font-sans mt-8 mb-4" }, "Đứa trẻ bên trong bạn"),
        React.createElement("p", null, "Mỗi người chúng ta cũng có và từng là 1 đứa trẻ, bạn nghĩ nó đã chết ở cái độ tuổi nào ư?"),
        React.createElement("div", { className: "border-l-4 border-academic-accent pl-4 italic text-gray-600 dark:text-gray-400 my-4" }, 
            "Chính suy nghĩ của bạn đang giết chết nó đấy, đứa trẻ trong bạn là sự hồn nhiên, dám đứng dạy sau những lần vấp ngả, dám thành thật đó, đừng để môi trường cuộc sống quá khắc nghiệt mà bạn bị chết đi tâm hồn trẻ ấy nha."
        )
      )
    )
  },
  {
    id: "icde-2022-pipeline",
    title: "Automated Data Pipeline Architectures for Real-time Anomaly Detection",
    date: "May 2022",
    category: "Data Engineering",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2670&auto=format&fit=crop",
    excerpt: "A deep dive into constructing low-latency distributed systems for detecting anomalies in high-throughput data streams using Apache Flink and Kafka, as presented at ICDE 2022.",
    content: React.createElement(React.Fragment, null, 
      React.createElement("div", { className: "space-y-6 font-serif leading-relaxed text-gray-800 dark:text-gray-300" },
        React.createElement("p", null, 
          React.createElement("strong", null, "Abstract: "),
          "In the era of big data, the ability to detect anomalies in real-time streams is critical for applications ranging from fraud detection to industrial system monitoring. This article explores the architecture proposed in our ICDE 2022 paper, focusing on a distributed pipeline that balances high throughput with millisecond-level latency."
        ),
        React.createElement("h3", { className: "text-xl font-bold text-gray-900 dark:text-white font-sans mt-8 mb-4" }, "The Core Challenge"),
        React.createElement("p", null, "Traditional batch processing methods (like Hadoop MapReduce) introduce significant delays, making them unsuitable for time-critical interventions. On the other hand, naive stream processing often lacks the state management required to detect complex, context-dependent anomalies."),
        React.createElement("p", null, "Our research tackles the specific problem of detecting multi-variate anomalies in sensor networks where individual data points might appear normal, but their correlation over a sliding window indicates a failure."),
        React.createElement("h3", { className: "text-xl font-bold text-gray-900 dark:text-white font-sans mt-8 mb-4" }, "Proposed Architecture"),
        React.createElement("div", { className: "bg-gray-50 dark:bg-gray-800 p-6 rounded-lg border border-gray-200 dark:border-gray-700 my-6" },
          React.createElement("h4", { className: "font-bold text-sm text-gray-500 dark:text-gray-400 uppercase mb-2" }, "System Components"),
          React.createElement("ul", { className: "list-disc pl-5 space-y-2" },
            React.createElement("li", null, React.createElement("strong", null, "Ingestion Layer:"), " Apache Kafka partitions streams by Sensor ID to ensure data locality."),
            React.createElement("li", null, React.createElement("strong", null, "Processing Layer:"), " Apache Flink uses KeyedProcessFunctions to maintain stateful windows (tumbling and sliding) for feature extraction."),
            React.createElement("li", null, React.createElement("strong", null, "Inference Layer:"), " A lightweight Isolation Forest model, trained offline and broadcasted to Flink task slots for low-latency scoring.")
          )
        ),
        React.createElement("h3", { className: "text-xl font-bold text-gray-900 dark:text-white font-sans mt-8 mb-4" }, "Key Findings"),
        React.createElement("p", null, "We benchmarked the system against Spark Streaming and found that Flink's event-time processing model significantly reduced false positives caused by out-of-order events. The pipeline sustained a throughput of 500,000 events/second with a p99 latency of under 45ms."),
        React.createElement("p", null, "This architecture demonstrates that it is possible to bring sophisticated ML models to the edge of the data stream without sacrificing consistency or scalability.")
      )
    )
  },
  {
    id: "cvpr-2024-vit",
    title: "Efficient Edge Inference for Vision Transformers",
    date: "June 2024",
    category: "Computer Vision",
    image: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?q=80&w=2565&auto=format&fit=crop",
    excerpt: "Scaling down ViTs for mobile devices without losing accuracy. We explore quantization and pruning techniques discussed in our CVPR Workshop paper.",
    content: React.createElement("p", { className: "dark:text-gray-300" }, "Full article content coming soon...")
  },
  {
    id: "isbi-2023-medical",
    title: "Contrastive Learning in Medical Imaging",
    date: "April 2023",
    category: "Medical AI",
    image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?q=80&w=2670&auto=format&fit=crop",
    excerpt: "Labeling medical data is expensive. This post analyzes how self-supervised contrastive learning can leverage unlabeled datasets to improve diagnostic accuracy.",
    content: React.createElement("p", { className: "dark:text-gray-300" }, "Full article content coming soon...")
  }
];