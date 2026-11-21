import React from 'react';
import { useThemeLanguage } from '../contexts/ThemeLanguageContext';

type Topic = { number: string; title: string; viTitle: string; description: string; viDescription: string; questions: string[]; viQuestions: string[] };

const topics: Topic[] = [
  { number: '01', title: 'Mathematical & Statistical Foundations', viTitle: 'Toán học & Nền tảng thống kê', description: 'Linear algebra, calculus, probability, statistics, optimization, information theory.', viDescription: 'Đại số tuyến tính, giải tích, xác suất, thống kê, tối ưu hóa và lý thuyết thông tin.', questions: ['How do mathematical assumptions shape a model?', 'What makes an estimator reliable?'], viQuestions: ['Giả định toán học ảnh hưởng thế nào đến mô hình?', 'Điều gì làm một ước lượng trở nên đáng tin cậy?'] },
  { number: '02', title: 'Machine Learning & Generalization', viTitle: 'Machine Learning & Khả năng tổng quát hóa', description: 'Supervised and unsupervised learning, regularization, representation, model selection, uncertainty.', viDescription: 'Học có giám sát và không giám sát, regularization, biểu diễn dữ liệu, chọn mô hình và độ bất định.', questions: ['Why does a model generalize beyond training data?', 'How should models be compared fairly?'], viQuestions: ['Vì sao mô hình tổng quát hóa được trên dữ liệu chưa thấy?', 'Làm thế nào để so sánh mô hình công bằng?'] },
  { number: '03', title: 'Deep Learning & Architectures', viTitle: 'Deep Learning & Kiến trúc mô hình', description: 'Neural networks, optimization, CNNs, attention, Transformers, self-supervised learning.', viDescription: 'Mạng nơ-ron, tối ưu hóa, CNN, attention, Transformer và self-supervised learning.', questions: ['What representations do neural networks learn?', 'Which inductive biases help a task?'], viQuestions: ['Mạng nơ-ron học được những biểu diễn nào?', 'Inductive bias nào phù hợp với từng bài toán?'] },
  { number: '04', title: 'Computer Vision & Biomedical AI', viTitle: 'Computer Vision & AI y sinh', description: 'Visual recognition, detection, segmentation, 3D learning, medical imaging and multimodal perception.', viDescription: 'Nhận diện hình ảnh, detection, segmentation, học 3D, ảnh y khoa và tri giác đa phương thức.', questions: ['How can models use spatial and clinical context?', 'How do we evaluate safety under distribution shift?'], viQuestions: ['Mô hình khai thác ngữ cảnh không gian và lâm sàng ra sao?', 'Đánh giá độ an toàn khi phân phối dữ liệu thay đổi thế nào?'] },
  { number: '05', title: 'Language Models & Multimodal AI', viTitle: 'Mô hình ngôn ngữ & AI đa phương thức', description: 'NLP, LLMs, tokenization, retrieval, reasoning, vision-language models and evaluation.', viDescription: 'NLP, LLM, tokenization, retrieval, reasoning, mô hình vision-language và đánh giá.', questions: ['What can benchmarks actually measure?', 'How should retrieval and generation be evaluated?'], viQuestions: ['Benchmark thực sự đo lường được điều gì?', 'Đánh giá retrieval và generation như thế nào?'] },
  { number: '06', title: 'Reinforcement Learning & Agents', viTitle: 'Reinforcement Learning & Agent', description: 'Decision processes, policy learning, planning, tool use, multi-agent systems and agent evaluation.', viDescription: 'Quá trình ra quyết định, học policy, planning, sử dụng công cụ, multi-agent và đánh giá agent.', questions: ['How do agents act reliably over long horizons?', 'How can we measure autonomy and tool-use quality?'], viQuestions: ['Làm sao để agent hành động tin cậy trong chuỗi dài?', 'Đo lường tính tự chủ và khả năng dùng công cụ ra sao?'] },
];

const SectionHeading: React.FC<{ index: string; title: string; subtitle: string }> = ({ index, title, subtitle }) => (
  <div className="mb-8 max-w-2xl">
    <p className="eyebrow text-blue-700 dark:text-blue-300 mb-3">{index} / Research notebook</p>
    <h2 className="text-3xl md:text-4xl text-gray-950 dark:text-gray-50">{title}</h2>
    <p className="mt-3 text-sm md:text-base leading-7 text-gray-600 dark:text-gray-400">{subtitle}</p>
  </div>
);

export const Home: React.FC = () => {
  const { language } = useThemeLanguage();
  const vi = language === 'vi';
  return (
    <div className="bg-white dark:bg-gray-950 text-gray-900 dark:text-gray-100">
      <section className="max-w-6xl mx-auto px-6 md:px-10 pt-16 md:pt-24 pb-16 md:pb-20">
        <div className="grid lg:grid-cols-[minmax(0,1fr)_250px] gap-12 lg:gap-20 items-end">
          <div className="max-w-3xl">
            <p className="eyebrow text-blue-700 dark:text-blue-300 mb-6">THANG NGUYEN <span className="text-gray-400">/</span> AI RESEARCH NOTEBOOK</p>
            <h1 className="text-5xl md:text-7xl leading-[1.04] tracking-[-0.045em] text-gray-950 dark:text-white">
              {vi ? 'Hiểu trí tuệ nhân tạo từ những nguyên lý nền tảng.' : 'Understanding AI from first principles.'}
            </h1>
            <p className="mt-7 text-lg md:text-xl leading-8 text-gray-600 dark:text-gray-300 max-w-2xl">
              {vi
                ? 'Tôi học, đọc và thực hành nghiên cứu về Machine Learning, Deep Learning và các hệ thống AI. Nơi này ghi lại câu hỏi, kiến thức, thí nghiệm và những điều tôi đang dần hiểu rõ hơn.'
                : 'I study and explore machine learning, deep learning, and AI systems. This is a living record of questions, concepts, experiments, and ideas I am working to understand.'}
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-gray-500 dark:text-gray-400">
              <span>{vi ? 'Khoa học dữ liệu · Việt Nam' : 'Data Science · Vietnam'}</span>
              <span className="hidden sm:inline text-gray-300">/</span>
              <span>{vi ? 'Định hướng nghiên cứu AI' : 'AI research interests'}</span>
            </div>
            <div className="mt-9 flex flex-wrap gap-3">
              <a href="#research-areas" className="inline-flex items-center gap-2 rounded-md bg-gray-950 dark:bg-white text-white dark:text-gray-950 px-5 py-3 text-sm font-semibold hover:opacity-85 no-underline">{vi ? 'Khám phá lĩnh vực AI' : 'Explore AI fields'} <span aria-hidden="true">↓</span></a>
              <a href="#writing" className="inline-flex items-center gap-2 rounded-md border border-gray-300 dark:border-gray-700 px-5 py-3 text-sm font-semibold text-gray-800 dark:text-gray-100 hover:border-blue-500 no-underline">{vi ? 'Đọc ghi chú nghiên cứu' : 'Read research notes'} <span aria-hidden="true">↗</span></a>
            </div>
          </div>
          <aside className="border-t-2 border-gray-900 dark:border-gray-100 pt-5">
            <p className="eyebrow text-gray-500 mb-4">{vi ? 'HỒ SƠ HỌC THUẬT' : 'RESEARCH PROFILE'}</p>
            <p className="font-serif text-2xl text-gray-950 dark:text-white">Nguyễn Hữu Thắng</p>
            <p className="mt-3 text-sm leading-6 text-gray-600 dark:text-gray-400">{vi ? 'Sinh viên Khoa học dữ liệu, đang xây dựng nền tảng toán học, năng lực thực nghiệm và tư duy nghiên cứu trong AI.' : 'Data Science student building foundations in mathematics, empirical methods, and AI research thinking.'}</p>
            <a className="text-link inline-flex mt-5 text-sm font-medium" href="https://github.com/6jffc" target="_blank" rel="noreferrer">GitHub profile ↗</a>
          </aside>
        </div>
      </section>

      <div className="border-y border-gray-200 dark:border-gray-800 bg-stone-50/80 dark:bg-gray-900/50">
        <section id="research-areas" className="max-w-6xl mx-auto px-6 md:px-10 py-16 md:py-20">
          <SectionHeading index="01" title={vi ? 'Các lĩnh vực AI tôi đang theo đuổi' : 'Areas of AI I am exploring'} subtitle={vi ? 'Từ nền tảng toán học đến các hệ thống thông minh. Mỗi lĩnh vực được tổ chức quanh những khái niệm cốt lõi và câu hỏi nghiên cứu, không phải danh sách công nghệ chạy theo xu hướng.' : 'From mathematical foundations to intelligent systems. Each field is organized around core concepts and research questions—not a checklist of fashionable tools.'} />
          <div className="grid md:grid-cols-2 xl:grid-cols-3 border-l border-t border-gray-200 dark:border-gray-800">
            {topics.map(topic => (
              <article key={topic.number} className="group min-h-[245px] p-6 md:p-7 border-r border-b border-gray-200 dark:border-gray-800 bg-white/70 dark:bg-gray-950/40 hover:bg-white dark:hover:bg-gray-950 transition-colors">
                <div className="flex items-center justify-between mb-7">
                  <span className="font-mono text-xs text-blue-700 dark:text-blue-300">{topic.number}</span>
                  <span className="text-gray-300 dark:text-gray-700 group-hover:text-blue-500 transition-colors" aria-hidden="true">↗</span>
                </div>
                <h3 className="font-sans font-semibold text-lg leading-snug text-gray-950 dark:text-gray-100">{vi ? topic.viTitle : topic.title}</h3>
                <p className="mt-3 text-sm leading-6 text-gray-600 dark:text-gray-400">{vi ? topic.viDescription : topic.description}</p>
                <div className="mt-5 pt-4 border-t border-gray-100 dark:border-gray-800">
                  <p className="eyebrow text-gray-400 mb-2">{vi ? 'CÂU HỎI ĐANG TÌM HIỂU' : 'QUESTIONS I AM EXPLORING'}</p>
                  <p className="text-xs leading-5 text-gray-600 dark:text-gray-400">{vi ? topic.viQuestions[0] : topic.questions[0]}</p>
                </div>
              </article>
            ))}
          </div>
          <div className="mt-6 text-right">
            <a className="text-link text-sm font-medium" href="https://www.cs.cmu.edu/~tom/10-702/">{vi ? 'Một ví dụ về cách tiếp cận học thuật có cấu trúc' : 'Example of a structured graduate-level ML course'} ↗</a>
          </div>
        </section>
      </div>

      <section className="max-w-6xl mx-auto px-6 md:px-10 py-16 md:py-20">
        <SectionHeading index="02" title={vi ? 'Những câu hỏi tôi muốn hiểu sâu' : 'Questions worth understanding deeply'} subtitle={vi ? 'Tôi muốn bắt đầu từ câu hỏi, giả định và bằng chứng; sau đó mới chọn thuật toán hoặc công cụ.' : 'I want to start with questions, assumptions, and evidence—and only then choose algorithms or tools.'} />
        <div className="grid md:grid-cols-2 gap-x-16">
          {(vi ? [
            ['Học và tổng quát hóa','Vì sao mô hình học tốt trên dữ liệu huấn luyện? Điều gì quyết định khả năng tổng quát hóa?'],
            ['Biểu diễn và kiến trúc','Mạng nơ-ron hình thành biểu diễn như thế nào? Attention giải quyết vấn đề gì?'],
            ['Suy luận và ra quyết định','Mô hình dự đoán, lập kế hoạch và hành động trong môi trường bất định ra sao?'],
            ['Đánh giá và độ tin cậy','Làm sao biết một hệ thống AI thực sự tốt, an toàn và hữu ích ngoài benchmark?'],
          ] : [
            ['Learning & generalization','Why do models learn from examples, and what determines their ability to generalize?'],
            ['Representations & architectures','How do neural networks form representations, and what problems does attention solve?'],
            ['Reasoning & decision-making','How can models predict, plan, and act under uncertainty?'],
            ['Evaluation & reliability','How do we know whether an AI system is genuinely capable, safe, and useful beyond a benchmark?'],
          ]).map(([title,desc],i)=>(
            <div key={title} className="py-6 border-b border-gray-200 dark:border-gray-800 flex gap-5">
              <span className="font-mono text-xs text-blue-700 dark:text-blue-300 pt-1">0{i+1}</span>
              <div><h3 className="font-sans text-base font-semibold text-gray-900 dark:text-gray-100">{title}</h3><p className="mt-2 text-sm leading-7 text-gray-600 dark:text-gray-400">{desc}</p></div>
            </div>
          ))}
        </div>
      </section>

      <section id="writing" className="bg-gray-50 dark:bg-gray-900/60 border-y border-gray-200 dark:border-gray-800">
        <div className="max-w-6xl mx-auto px-6 md:px-10 py-16 md:py-20">
          <SectionHeading index="03" title={vi ? 'Notebook: đọc, nghĩ và viết' : 'Notebook: reading, thinking, writing'} subtitle={vi ? 'Viết blog là một phần của quá trình nghiên cứu: giải thích lại khái niệm, đọc paper có phản biện, ghi lại thí nghiệm và công khai giới hạn hiểu biết.' : 'Writing is part of research: explaining concepts, reading papers critically, documenting experiments, and being explicit about the limits of my understanding.'} />
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-0 border-l border-t border-gray-200 dark:border-gray-800">
            {(vi ? [
              ['Paper notes','Tóm tắt đóng góp, phương pháp, giả định, kết quả và hạn chế.'],
              ['Concept explainers','Giải thích từ nguyên lý đầu tiên: toán học, thuật toán và kiến trúc AI.'],
              ['Experiment logs','Baseline, thiết lập, metric, kết quả âm tính và phân tích lỗi.'],
              ['Research questions','Những điều chưa rõ, giả thuyết cần kiểm chứng và hướng đọc tiếp.'],
            ] : [
              ['Paper notes','Contributions, methods, assumptions, results, and limitations.'],
              ['Concept explainers','First-principles explanations of mathematics, algorithms, and AI architectures.'],
              ['Experiment logs','Baselines, setups, metrics, negative results, and error analysis.'],
              ['Research questions','Open problems, hypotheses to test, and directions for further reading.'],
            ]).map(([title,desc],i)=>(
              <div key={title} className="p-5 md:p-6 border-r border-b border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-950">
                <span className="font-mono text-xs text-blue-700 dark:text-blue-300">0{i+1}</span>
                <h3 className="mt-4 font-sans font-semibold text-base">{title}</h3>
                <p className="mt-2 text-sm leading-6 text-gray-600 dark:text-gray-400">{desc}</p>
              </div>
            ))}
          </div>
          <a className="text-link inline-flex mt-7 text-sm font-semibold" href="#top" onClick={(event) => { event.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }); }}>{vi ? 'Trở về đầu trang ↑' : 'Back to top ↑'}</a>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-6 md:px-10 py-16 md:py-20">
        <SectionHeading index="04" title={vi ? 'Cách tôi tiếp cận nghiên cứu' : 'How I approach research'} subtitle={vi ? 'Một quy trình tốt giúp phân biệt điều ta tin, điều ta đo được và điều bằng chứng thực sự cho phép kết luận.' : 'A sound process separates what we believe, what we measure, and what the evidence actually allows us to conclude.'} />
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {(vi ? [
            ['01','Đặt vấn đề','Xác định câu hỏi, giả thuyết, phạm vi và giả định.'],
            ['02','Đọc & kiểm tra','Đọc paper, truy nguồn dữ liệu, kiểm tra chất lượng và leakage.'],
            ['03','Thực nghiệm','Xây baseline, thiết kế validation và so sánh có kiểm soát.'],
            ['04','Phân tích & chia sẻ','Phân tích lỗi, bất định, giới hạn và công bố cách tái lập.'],
          ] : [
            ['01','Formulate','Define the question, hypothesis, scope, and assumptions.'],
            ['02','Inspect','Read papers, trace data provenance, inspect quality, and check leakage.'],
            ['03','Experiment','Build baselines, design validation, and compare under controlled conditions.'],
            ['04','Analyze & share','Study errors, uncertainty, and limitations; document reproducibility.'],
          ]).map(([n,title,desc])=>(
            <div key={n} className="border-t-2 border-gray-900 dark:border-gray-100 pt-4">
              <p className="font-mono text-xs text-blue-700 dark:text-blue-300">{n}</p>
              <h3 className="mt-3 font-sans font-semibold text-base">{title}</h3>
              <p className="mt-2 text-sm leading-6 text-gray-600 dark:text-gray-400">{desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-gray-950 dark:bg-black text-white">
        <div className="max-w-6xl mx-auto px-6 md:px-10 py-12 md:py-14 flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          <div>
            <p className="eyebrow text-blue-300 mb-3">OPEN NOTEBOOK · OPEN SOURCE</p>
            <h2 className="text-2xl md:text-3xl text-white">{vi ? 'Học hỏi công khai. Tiến bộ có bằng chứng.' : 'Learn in public. Improve with evidence.'}</h2>
            <p className="mt-3 text-sm text-gray-300 max-w-xl">{vi ? 'Tôi ghi lại cả câu trả lời lẫn câu hỏi còn bỏ ngỏ. Nếu bạn cũng quan tâm đến nền tảng và nghiên cứu AI, hãy cùng trao đổi.' : 'I document both what I learn and what remains unanswered. If you care about AI foundations and research, I would be glad to exchange ideas.'}</p>
          </div>
          <a href="https://github.com/6jffc" target="_blank" rel="noreferrer" className="inline-flex items-center justify-center rounded-md bg-white text-gray-950 px-5 py-3 text-sm font-semibold hover:bg-blue-50 no-underline">GitHub profile ↗</a>
        </div>
      </section>
    </div>
  );
};