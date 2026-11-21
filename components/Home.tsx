import React from 'react';
import { useThemeLanguage } from '../contexts/ThemeLanguageContext';

const SectionTitle: React.FC<{eyebrow:string; title:string; note?:string}> = ({eyebrow,title,note}) => (
  <div className="mb-7">
    <p className="text-xs font-mono uppercase tracking-[.18em] text-blue-600 dark:text-blue-400 mb-2">{eyebrow}</p>
    <h2 className="text-2xl md:text-3xl font-semibold tracking-tight text-gray-950 dark:text-gray-50">{title}</h2>
    {note && <p className="mt-2 text-sm leading-7 text-gray-600 dark:text-gray-400 max-w-3xl">{note}</p>}
  </div>
);

export const Home: React.FC = () => {
  const { language } = useThemeLanguage();
  const vi = language === 'vi';
  const text = vi ? {
    role:'Sinh viên Khoa học dữ liệu · Người học và thực hành nghiên cứu AI',
    intro:'Tôi quan tâm đến cách biến những ý tưởng toán học và thuật toán học máy thành hệ thống AI có thể kiểm chứng, tái lập và hữu ích trong thực tế.',
    location:'Việt Nam', status:'Đang xây dựng nền tảng nghiên cứu',
    focus:'Hướng nghiên cứu', focusNote:'Các chủ đề tôi đang học, đọc paper và thử nghiệm. Đây là định hướng phát triển, không phải tuyên bố chuyên môn đã hoàn tất.',
    areas:[['Machine Learning & Statistical Learning','Mô hình hóa, xác suất, suy luận thống kê, đánh giá và khả năng tổng quát hóa.'],['Computer Vision & Medical AI','Phân tích ảnh, mô hình 2D/3D, segmentation và ứng dụng AI trong tin học y sinh.'],['LLMs & AI Systems','Transformer, RAG, agents, orchestration, đánh giá và triển khai ứng dụng AI.'],['Reliable ML & MLOps','Data pipeline, validation, reproducibility, monitoring và triển khai mô hình.']],
    now:'Đang nghiên cứu và thực hành', nowNote:'Tôi ưu tiên dự án có dữ liệu, baseline, tiêu chí đánh giá, thí nghiệm đối chứng và nhật ký quyết định rõ ràng.',
    projects:[['Credit Card Fraud Detection','Phân loại gian lận giao dịch; tập trung vào class imbalance, ROC-AUC, validation và kiểm soát leakage.','In progress','/projects/credit-card-fraud/'],['3D Medical Image Segmentation','Thực hành 3D U-Net, xử lý volume MRI, sliding-window inference và đánh giá segmentation.','Research practice',''],['Vehicle Detection & Distance Estimation','Bài toán thị giác máy tính kết hợp phát hiện đối tượng và ước lượng khoảng cách.','Selected project',''],['Vietnamese Job Description Intelligence','Xây dựng pipeline dữ liệu và trợ lý phân tích mô tả công việc tiếng Việt.','Applied AI','']],
    writing:'Viết để hiểu sâu hơn', writingNote:'Blog là nơi tôi ghi lại quá trình học, giải thích lại khái niệm bằng ngôn ngữ của mình, phân tích paper và công bố cả những điều chưa thành công.',
    categories:[['Research notes','Ghi chú đọc paper, giả thuyết và câu hỏi nghiên cứu.'],['Technical tutorials','Toán học, thuật toán, ML/DL và triển khai Python.'],['Experiments & failures','Thiết kế thí nghiệm, kết quả âm tính, lỗi và bài học.'],['AI systems','LLM, agents, MLOps và kỹ thuật xây dựng sản phẩm.']],
    method:'Nguyên tắc làm nghiên cứu', methodNote:'Một dự án tốt không chỉ có mô hình chạy được. Nó cần câu hỏi rõ, dữ liệu có nguồn gốc, baseline phù hợp, phép đo đúng và kết quả có thể tái lập.',
    principles:['Đặt câu hỏi và giả thuyết trước khi chọn mô hình.','Đọc và kiểm tra dữ liệu trước khi huấn luyện.','Thiết lập baseline và validation trước tối ưu.','So sánh công bằng: cùng split, metric và điều kiện.','Ghi lại seed, cấu hình, phiên bản dữ liệu và commit.','Phân biệt kết quả đo được, giả thuyết và ý kiến cá nhân.'],
    connect:'Kết nối & hồ sơ', connectNote:'Tôi luôn sẵn sàng trao đổi về AI, học thuật, dự án mã nguồn mở và cơ hội cộng tác.',
    links:[['GitHub','https://github.com/6jffc'],['Kaggle','https://www.kaggle.com/'],['Email','mailto:']]
  } : {
    role:'Data Science student · AI research learner and practitioner',
    intro:'I am interested in turning mathematical ideas and machine-learning methods into AI systems that are measurable, reproducible, and useful in practice.',
    location:'Vietnam', status:'Building a research foundation',
    focus:'Research interests', focusNote:'Topics I am currently studying, reading about, and experimenting with. These are developing interests, not claims of established expertise.',
    areas:[['Machine Learning & Statistical Learning','Modeling, probability, statistical reasoning, evaluation, and generalization.'],['Computer Vision & Medical AI','Image analysis, 2D/3D models, segmentation, and biomedical informatics.'],['LLMs & AI Systems','Transformers, RAG, agents, orchestration, evaluation, and AI applications.'],['Reliable ML & MLOps','Data pipelines, validation, reproducibility, monitoring, and deployment.']],
    now:'Current research practice', nowNote:'I prioritize projects with explicit datasets, baselines, evaluation criteria, controlled experiments, and traceable research notes.',
    projects:[['Credit Card Fraud Detection','Transaction fraud classification, with a focus on class imbalance, ROC-AUC, validation, and leakage control.','In progress','/projects/credit-card-fraud/'],['3D Medical Image Segmentation','Hands-on work with 3D U-Net, MRI volumes, sliding-window inference, and segmentation evaluation.','Research practice',''],['Vehicle Detection & Distance Estimation','A computer-vision task combining object detection and distance estimation.','Selected project',''],['Vietnamese Job Description Intelligence','A data pipeline and assistant for analyzing Vietnamese job descriptions.','Applied AI','']],
    writing:'Writing as a way to think', writingNote:'This blog documents how I learn: explaining concepts in my own words, reading papers critically, sharing experiments, and being transparent about what did not work.',
    categories:[['Research notes','Paper reading, hypotheses, and open research questions.'],['Technical tutorials','Mathematics, algorithms, ML/DL, and Python implementation.'],['Experiments & failures','Experimental design, negative results, debugging, and lessons.'],['AI systems','LLMs, agents, MLOps, and engineering AI products.']],
    method:'Research principles', methodNote:'A strong project is more than a working model. It needs a clear question, traceable data, a meaningful baseline, appropriate metrics, and reproducible evidence.',
    principles:['Write the research question and hypothesis before choosing a model.','Inspect and understand the data before training.','Establish a baseline and validation protocol before tuning.','Compare fairly: same splits, metrics, and conditions.','Record seeds, configurations, data versions, and code commits.','Separate measured results, hypotheses, and personal opinions.'],
    connect:'Connect & profiles', connectNote:'I welcome conversations about AI, learning, open-source projects, and research collaboration.',
    links:[['GitHub','https://github.com/6jffc'],['Kaggle','https://www.kaggle.com/'],['Email','mailto:']]
  };
  return (
    <div className="bg-white dark:bg-gray-950 text-gray-900 dark:text-gray-100">
      <div className="max-w-5xl mx-auto px-6 pt-16 md:pt-24 pb-14">
        <div className="max-w-3xl">
          <p className="text-xs font-mono uppercase tracking-[.2em] text-blue-600 dark:text-blue-400 mb-5">THANG NGUYEN / AI & DATA SCIENCE</p>
          <h1 className="text-4xl md:text-6xl font-semibold tracking-[-.045em] leading-[1.08]"> {vi ? 'Học sâu. Nghiên cứu có phương pháp. Xây dựng có trách nhiệm.' : 'Learn deeply. Research rigorously. Build responsibly.'}</h1>
          <p className="mt-6 text-lg md:text-xl leading-8 text-gray-600 dark:text-gray-300">{text.intro}</p>
          <div className="mt-7 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-gray-500 dark:text-gray-400">
            <span>{text.role}</span><span>·</span><span>{text.location}</span><span>·</span><span className="text-emerald-700 dark:text-emerald-400">{text.status}</span>
          </div>
          <div className="mt-8 flex flex-wrap gap-3">
            <a href="#research" className="px-4 py-2.5 bg-gray-950 dark:bg-white text-white dark:text-gray-950 text-sm font-medium rounded-md hover:opacity-80">{vi?'Khám phá nghiên cứu':'Explore research'}</a>
            <a href="#writing" className="px-4 py-2.5 border border-gray-300 dark:border-gray-700 text-sm rounded-md hover:border-blue-500">{vi?'Đọc blog':'Read the blog'}</a>
            <a href="https://github.com/6jffc" target="_blank" rel="noreferrer" className="px-4 py-2.5 text-sm text-blue-700 dark:text-blue-400 hover:underline">GitHub ↗</a>
          </div>
        </div>
      </div>
      <div className="border-y border-gray-200 dark:border-gray-800 bg-gray-50/70 dark:bg-gray-900/50">
        <div className="max-w-5xl mx-auto px-6 py-12 grid md:grid-cols-2 gap-10">
          <div><SectionTitle eyebrow="01 / FOCUS" title={text.focus} note={text.focusNote}/></div>
          <div className="grid sm:grid-cols-2 gap-x-8 gap-y-7">{text.areas.map(([title,desc])=><div key={title}><h3 className="font-semibold text-base">{title}</h3><p className="mt-2 text-sm leading-6 text-gray-600 dark:text-gray-400">{desc}</p></div>)}</div>
        </div>
      </div>
      <section id="research" className="max-w-5xl mx-auto px-6 py-16">
        <SectionTitle eyebrow="02 / ON THE WORKBENCH" title={text.now} note={text.nowNote}/>
        <div className="divide-y divide-gray-200 dark:divide-gray-800 border-y border-gray-200 dark:border-gray-800">
          {text.projects.map(([title,desc,status,href],i)=><div key={title} className="py-5 grid md:grid-cols-[42px_1fr_auto] gap-3 md:gap-5 items-start">
            <span className="font-mono text-xs text-gray-400 pt-1">0{i+1}</span><div><h3 className="font-semibold">{title}</h3><p className="mt-1 text-sm leading-6 text-gray-600 dark:text-gray-400 max-w-2xl">{desc}</p>{href && <a className="inline-block mt-2 text-sm text-blue-700 dark:text-blue-400 hover:underline" href={href}> {vi?'Mở research page':'Open research page'} ↗</a>}</div><span className="text-[11px] font-mono uppercase tracking-wide text-gray-500 border border-gray-200 dark:border-gray-700 rounded px-2 py-1 whitespace-nowrap">{status}</span>
          </div>)}
        </div>
      </section>
      <section id="writing" className="bg-gray-50 dark:bg-gray-900/60 border-y border-gray-200 dark:border-gray-800">
        <div className="max-w-5xl mx-auto px-6 py-16">
          <SectionTitle eyebrow="03 / NOTEBOOK" title={text.writing} note={text.writingNote}/>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">{text.categories.map(([title,desc],i)=><a key={title} href="#blog" className="p-5 bg-white dark:bg-gray-950 border border-gray-200 dark:border-gray-800 hover:border-blue-400 transition-colors"><span className="text-xs font-mono text-gray-400">0{i+1}</span><h3 className="mt-3 font-semibold">{title}</h3><p className="mt-2 text-sm leading-6 text-gray-600 dark:text-gray-400">{desc}</p></a>)}</div>
          <a id="blog" href="#blog" className="inline-block mt-6 text-sm text-blue-700 dark:text-blue-400 hover:underline">{vi?'Đi tới mục Blog trong thanh điều hướng':'Open Writing from the navigation'} ↗</a>
        </div>
      </section>
      <section className="max-w-5xl mx-auto px-6 py-16">
        <SectionTitle eyebrow="04 / METHOD" title={text.method} note={text.methodNote}/>
        <div className="grid md:grid-cols-2 gap-x-12 gap-y-4">{text.principles.map((p,i)=><div key={p} className="flex gap-4 py-3 border-b border-gray-100 dark:border-gray-800"><span className="font-mono text-xs text-blue-600 dark:text-blue-400 pt-1">0{i+1}</span><p className="text-sm leading-6 text-gray-700 dark:text-gray-300">{p}</p></div>)}</div>
      </section>
      <section className="bg-gray-950 text-white dark:bg-black">
        <div className="max-w-5xl mx-auto px-6 py-14 flex flex-col md:flex-row md:items-end md:justify-between gap-8">
          <div><p className="text-xs font-mono tracking-[.18em] uppercase text-blue-300 mb-3">05 / CONTACT</p><h2 className="text-2xl md:text-3xl font-semibold">{text.connect}</h2><p className="mt-3 text-sm text-gray-300 max-w-xl">{text.connectNote}</p></div>
          <div className="flex flex-wrap gap-5 text-sm">{text.links.map(([label,url])=><a key={label} href={url} target={url.startsWith('mailto:')?undefined:'_blank'} rel="noreferrer" className="text-blue-300 hover:text-white underline underline-offset-4">{label} ↗</a>)}</div>
        </div>
      </section>
    </div>
  );
};
