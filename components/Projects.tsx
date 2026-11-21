import React from 'react';
import { useThemeLanguage } from '../contexts/ThemeLanguageContext';
import { Sidebar } from './Sidebar';

type Field = { name: string; viName: string; scope: string; viScope: string; foundations: string[]; viFoundations: string[]; questions: string[]; viQuestions: string[]; resources: { label: string; url: string }[] };

const fields: Field[] = [
  { name: 'Mathematics for AI', viName: 'Toán học cho AI', scope: 'Linear algebra · Calculus · Probability · Statistics · Optimization · Information theory', viScope: 'Đại số tuyến tính · Giải tích · Xác suất · Thống kê · Tối ưu hóa · Lý thuyết thông tin', foundations: ['Vector spaces and matrix decompositions', 'Gradients, Jacobians, and chain rule', 'Random variables and distributions', 'Maximum likelihood and Bayesian inference'], viFoundations: ['Không gian vector và phân rã ma trận', 'Gradient, Jacobian và chain rule', 'Biến ngẫu nhiên và phân phối', 'Maximum likelihood và suy luận Bayes'], questions: ['Which mathematical assumptions are made by common learning algorithms?'], viQuestions: ['Những giả định toán học nào nằm sau các thuật toán học phổ biến?'], resources: [{label:'Mathematics for Machine Learning',url:'https://mml-book.github.io/'},{label:'Statlect',url:'https://www.statlect.com/'}] },
  { name: 'Statistical & Classical Machine Learning', viName: 'Machine Learning cổ điển & thống kê', scope: 'Regression · Classification · Trees · Ensembles · Clustering · Generalization · Calibration', viScope: 'Hồi quy · Phân loại · Cây quyết định · Ensemble · Clustering · Tổng quát hóa · Calibration', foundations: ['Empirical risk minimization', 'Bias–variance trade-off', 'Regularization and model selection', 'Cross-validation and data leakage'], viFoundations: ['Empirical risk minimization', 'Bias–variance trade-off', 'Regularization và chọn mô hình', 'Cross-validation và data leakage'], questions: ['When does a model learn signal rather than memorize noise?'], viQuestions: ['Khi nào mô hình học được tín hiệu thay vì ghi nhớ nhiễu?'], resources: [{label:'The Elements of Statistical Learning',url:'https://hastie.su.domains/ElemStatLearn/'},{label:'Scikit-learn User Guide',url:'https://scikit-learn.org/stable/user_guide.html'}] },
  { name: 'Deep Learning', viName: 'Deep Learning', scope: 'Neural networks · Backpropagation · Optimization · CNN · Attention · Transformers · Self-supervision', viScope: 'Mạng nơ-ron · Backpropagation · Tối ưu hóa · CNN · Attention · Transformer · Self-supervised learning', foundations: ['Computational graphs and automatic differentiation', 'Initialization, normalization, and optimizers', 'Representation learning', 'Architectural inductive biases'], viFoundations: ['Đồ thị tính toán và automatic differentiation', 'Khởi tạo, normalization và optimizer', 'Representation learning', 'Inductive bias của kiến trúc'], questions: ['How do depth, width, data, and compute interact?'], viQuestions: ['Độ sâu, độ rộng, dữ liệu và năng lực tính toán tương tác thế nào?'], resources: [{label:'Dive into Deep Learning',url:'https://d2l.ai/'},{label:'PyTorch Tutorials',url:'https://pytorch.org/tutorials/'}] },
  { name: 'Computer Vision & Medical AI', viName: 'Computer Vision & AI y sinh', scope: 'Image classification · Detection · Segmentation · 3D vision · Medical imaging · Robustness', viScope: 'Phân loại ảnh · Detection · Segmentation · Thị giác 3D · Ảnh y khoa · Độ bền vững', foundations: ['Convolution and spatial hierarchies', 'Geometric transformations and coordinate systems', 'Dense prediction and loss functions', 'Patient-level validation and domain shift'], viFoundations: ['Convolution và phân cấp không gian', 'Biến đổi hình học và hệ tọa độ', 'Dense prediction và hàm mất mát', 'Validation theo bệnh nhân và domain shift'], questions: ['How can visual models remain reliable across scanners and populations?'], viQuestions: ['Làm sao để mô hình thị giác đáng tin cậy giữa các máy chụp và quần thể khác nhau?'], resources: [{label:'医学 / Medical imaging papers on Papers with Code',url:'https://paperswithcode.com/area/medical'} ,{label:'MONAI Documentation',url:'https://docs.monai.io/'}] },
  { name: 'NLP, LLMs & Multimodal Learning', viName: 'NLP, LLM & Học đa phương thức', scope: 'Tokenization · Language modeling · Retrieval · Fine-tuning · Reasoning · Vision-language models', viScope: 'Tokenization · Language modeling · Retrieval · Fine-tuning · Reasoning · Vision-language models', foundations: ['Attention and Transformer architecture', 'Pretraining objectives and scaling', 'Retrieval-augmented generation', 'Evaluation, alignment, and calibration'], viFoundations: ['Attention và kiến trúc Transformer', 'Mục tiêu pretraining và scaling', 'Retrieval-augmented generation', 'Đánh giá, alignment và calibration'], questions: ['How should we evaluate factuality, reasoning, and grounded generation?'], viQuestions: ['Nên đánh giá factuality, reasoning và grounded generation như thế nào?'], resources: [{label:'The Illustrated Transformer',url:'https://jalammar.github.io/illustrated-transformer/'},{label:'Hugging Face Course',url:'https://huggingface.co/learn'}] },
  { name: 'Reinforcement Learning & Decision Systems', viName: 'Reinforcement Learning & Hệ thống ra quyết định', scope: 'MDPs · Dynamic programming · Policy gradients · Model-based RL · Planning · Multi-agent systems', viScope: 'MDP · Dynamic programming · Policy gradient · Model-based RL · Planning · Multi-agent systems', foundations: ['Markov decision processes', 'Value functions and Bellman equations', 'Exploration versus exploitation', 'Offline and online policy evaluation'], viFoundations: ['Markov decision process', 'Value function và phương trình Bellman', 'Exploration và exploitation', 'Đánh giá policy offline và online'], questions: ['What makes an agent robust when observations and rewards are incomplete?'], viQuestions: ['Điều gì giúp agent vững vàng khi quan sát và reward không đầy đủ?'], resources: [{label:'Sutton & Barto — Reinforcement Learning',url:'http://incompleteideas.net/book/the-book-2nd.html'},{label:'Spinning Up in Deep RL',url:'https://spinningup.openai.com/'}] },
  { name: 'AI Systems, Evaluation & MLOps', viName: 'Hệ thống AI, đánh giá & MLOps', scope: 'Data engineering · Experiment tracking · Serving · Monitoring · Reliability · Responsible AI', viScope: 'Data engineering · Theo dõi thí nghiệm · Serving · Monitoring · Độ tin cậy · AI có trách nhiệm', foundations: ['Data and model versioning', 'Reproducible experiments', 'Offline and online evaluation', 'Monitoring and feedback loops'], viFoundations: ['Quản lý phiên bản dữ liệu và mô hình', 'Thí nghiệm có thể tái lập', 'Đánh giá offline và online', 'Monitoring và vòng phản hồi'], questions: ['How do we detect model degradation after deployment?'], viQuestions: ['Làm sao phát hiện mô hình suy giảm sau triển khai?'], resources: [{label:'Made With ML',url:'https://madewithml.com/'},{label:'MLflow Documentation',url:'https://mlflow.org/docs/latest/'}] },
];

export const Projects: React.FC = () => {
  const { language } = useThemeLanguage();
  const vi = language === 'vi';
  return (
    <div className="min-h-screen bg-white dark:bg-gray-950 text-gray-900 dark:text-gray-100">
      <div className="max-w-6xl mx-auto px-6 md:px-10 py-14 md:py-20 grid lg:grid-cols-[minmax(0,1fr)_220px] gap-12">
        <main>
          <header className="pb-9 border-b border-gray-200 dark:border-gray-800">
            <p className="eyebrow text-blue-700 dark:text-blue-300 mb-3">AI KNOWLEDGE MAP / CORE FIELDS</p>
            <h1 className="text-4xl md:text-5xl text-gray-950 dark:text-white">{vi ? 'Bản đồ tri thức AI' : 'AI Knowledge Map'}</h1>
            <p className="mt-4 max-w-3xl text-base leading-8 text-gray-600 dark:text-gray-400">{vi ? 'Một bản đồ có cấu trúc để học AI từ nền tảng đến nghiên cứu chuyên sâu. Mỗi lĩnh vực kết nối các khái niệm, câu hỏi khoa học và tài liệu học thuật đáng tin cậy.' : 'A structured map for studying AI from foundations to advanced research. Each field connects core concepts, scientific questions, and dependable learning resources.'}</p>
          </header>
          <div className="divide-y divide-gray-200 dark:divide-gray-800">
            {fields.map((field, index) => (
              <article key={field.name} className="py-8">
                <div className="flex gap-5">
                  <span className="font-mono text-sm text-blue-700 dark:text-blue-300 pt-1">0{index + 1}</span>
                  <div className="min-w-0 flex-1">
                    <h2 className="text-2xl text-gray-950 dark:text-white">{vi ? field.viName : field.name}</h2>
                    <p className="mt-2 text-xs md:text-sm leading-6 text-gray-500 dark:text-gray-400">{vi ? field.viScope : field.scope}</p>
                    <div className="grid md:grid-cols-2 gap-8 mt-6">
                      <div>
                        <h3 className="eyebrow text-gray-500 mb-3">{vi ? 'KHÁI NIỆM CỐT LÕI' : 'CORE CONCEPTS'}</h3>
                        <ul className="space-y-2 text-sm leading-6 text-gray-700 dark:text-gray-300 list-disc pl-5">
                          {(vi ? field.viFoundations : field.foundations).map(item => <li key={item}>{item}</li>)}
                        </ul>
                      </div>
                      <div>
                        <h3 className="eyebrow text-gray-500 mb-3">{vi ? 'CÂU HỎI NGHIÊN CỨU' : 'RESEARCH QUESTION'}</h3>
                        <p className="text-sm leading-7 text-gray-700 dark:text-gray-300">{vi ? field.viQuestions[0] : field.questions[0]}</p>
                        <div className="flex flex-wrap gap-x-5 gap-y-2 mt-5">
                          {field.resources.map(resource => <a key={resource.url} className="text-link text-sm font-medium" href={resource.url} target="_blank" rel="noreferrer">{resource.label} ↗</a>)}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>
          <section className="mt-8 p-6 bg-stone-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-800">
            <h2 className="text-xl">{vi ? 'Một nguyên tắc định hướng' : 'A guiding principle'}</h2>
            <p className="mt-3 text-sm leading-7 text-gray-600 dark:text-gray-400">{vi ? 'Không học AI chỉ bằng cách ghi nhớ tên mô hình. Hãy hiểu bài toán, giả định, hàm mục tiêu, dữ liệu, cách đánh giá và giới hạn của từng phương pháp.' : 'Do not study AI by memorizing model names. Understand the problem, assumptions, objective, data, evaluation protocol, and limitations behind each method.'}</p>
          </section>
        </main>
        <Sidebar />
      </div>
    </div>
  );
};