
import React from 'react';
import { EDUCATION, PUBLICATIONS } from '../constants';
import { Sidebar } from './Sidebar';
import { useThemeLanguage } from '../contexts/ThemeLanguageContext';

export const Home: React.FC = () => {
  const { t, language } = useThemeLanguage();

  return (
    <div className="w-full bg-white dark:bg-gray-900 transition-colors duration-300">
        {/* 1. Hero Image / Banner */}
        <div className="w-full h-80 bg-gray-100 dark:bg-gray-800 overflow-hidden relative border-b border-gray-200 dark:border-gray-700 group">
             {/* Background Image */}
             <div className="absolute inset-0">
                <img 
                    src="https://images.unsplash.com/photo-1558591710-4b4a1ae0f04d?q=80&w=2574&auto=format&fit=crop" 
                    alt="Artistic Landscape Background" 
                    className="w-full h-full object-cover opacity-90 dark:opacity-60 transition-transform duration-[20s] ease-in-out group-hover:scale-110"
                />
                {/* Overlay gradient for smooth transition */}
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/10 to-white dark:via-gray-900/10 dark:to-gray-900"></div>
             </div>
             
             <div className="max-w-7xl mx-auto h-full px-6 flex items-end pb-8 relative z-10">
                 {/* Optional content over the banner */}
             </div>
        </div>

        <div className="max-w-7xl mx-auto px-6 py-12">
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">
                
                {/* --- LEFT COLUMN (MAIN CONTENT) --- */}
                <div className="lg:col-span-3 space-y-16">
                    
                    {/* Section: Profile Header */}
                    <section>
                        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-8 font-sans border-b border-gray-200 dark:border-gray-700 pb-4">{t.profile.header}</h1>
                        
                        <h2 className="text-xl font-bold text-gray-800 dark:text-gray-200 mb-4 font-sans">{t.profile.titles}</h2>
                        <ul className="list-disc pl-5 space-y-2 text-gray-700 dark:text-gray-300 font-serif leading-relaxed">
                            {t.profile.distinctions.map((item, idx) => (
                                <li key={idx}>{item}</li>
                            ))}
                        </ul>
                    </section>

                    {/* Section: Biography */}
                    <section>
                        <div className="flex justify-between items-baseline mb-6 border-b border-gray-200 dark:border-gray-700 pb-2">
                             <h2 className="text-2xl font-bold text-gray-900 dark:text-white font-sans">{t.profile.biography}</h2>
                             <a href="#" className="text-sm font-bold text-academic-accent dark:text-blue-400 hover:underline font-sans uppercase tracking-wider">
                                <i className="fas fa-file-pdf mr-2"></i>{t.profile.downloadCv}
                             </a>
                        </div>
                        
                        <div className="space-y-8 font-serif text-gray-700 dark:text-gray-300 leading-relaxed text-justify">
                            <div>
                                <h3 className="text-lg font-bold text-gray-900 dark:text-gray-100 mb-2 font-sans">{t.profile.shortVersion}</h3>
                                <p>
                                    {language === 'en' 
                                     ? "Nguyen Huu Thang is an AI Researcher and MLOps Engineer specializing in bridging the gap between theoretical Deep Learning and scalable, real-world applications. He is the Founder of Neural Nexus and a Ph.D. Candidate focusing on Computer Vision and Edge Intelligence."
                                     : "Nguyễn Hữu Thắng là một Nhà nghiên cứu AI và Kỹ sư MLOps chuyên về việc thu hẹp khoảng cách giữa Deep Learning lý thuyết và các ứng dụng thực tế có thể mở rộng. Anh là Người sáng lập Neural Nexus và là Nghiên cứu sinh Tiến sĩ tập trung vào Thị giác Máy tính và Trí tuệ biên."}
                                </p>
                            </div>

                            <div>
                                <h3 className="text-lg font-bold text-gray-900 dark:text-gray-100 mb-2 font-sans">{t.profile.mediumVersion}</h3>
                                <p>
                                    {language === 'en' 
                                     ? "Recognized for his contributions to efficient edge inference and automated data pipelines, Nguyen Huu Thang works at the intersection of academic research and engineering. His work primarily addresses the challenges of deploying heavy Vision Transformers (ViTs) in resource-constrained environments."
                                     : "Được công nhận vì những đóng góp cho suy luận biên hiệu quả và đường ống dữ liệu tự động, Nguyễn Hữu Thắng làm việc tại giao điểm của nghiên cứu học thuật và kỹ thuật. Công việc của anh chủ yếu giải quyết các thách thức trong việc triển khai Vision Transformers (ViTs) nặng nề trong môi trường hạn chế tài nguyên."}
                                </p>
                                <p className="mt-4">
                                     {language === 'en'
                                      ? "He holds a Master's in Artificial Intelligence and has published key papers in workshops at CVPR and ICDE. Beyond research, Thang is an active open-source contributor and educator, aiming to democratize access to advanced AI tools through his platform, Neural Nexus. He actively consults for startups looking to build robust MLOps infrastructure."
                                      : "Anh có bằng Thạc sĩ về Trí tuệ Nhân tạo và đã xuất bản các bài báo chính tại các hội thảo CVPR và ICDE. Ngoài nghiên cứu, Thắng là một người đóng góp mã nguồn mở tích cực và là nhà giáo dục, với mục tiêu dân chủ hóa việc tiếp cận các công cụ AI tiên tiến thông qua nền tảng của mình, Neural Nexus. Anh tích cực tư vấn cho các công ty khởi nghiệp muốn xây dựng cơ sở hạ tầng MLOps mạnh mẽ."}
                                </p>
                            </div>
                        </div>
                    </section>

                    {/* Section: Selected Publications */}
                    <section>
                         <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 font-sans border-b border-gray-200 dark:border-gray-700 pb-2">{t.profile.publications}</h2>
                         <div className="space-y-6">
                            {PUBLICATIONS.map((pub, idx) => (
                                <div key={idx} className="font-serif text-gray-800 dark:text-gray-300">
                                    <p>
                                        <span className="font-bold">Nguyen, H.T.</span>, et al. ({pub.year}). "{pub.title}". In: <span className="italic">{pub.venue}</span>.
                                    </p>
                                    <div className="mt-1">
                                        <a href="#" className="text-sm text-academic-accent dark:text-blue-400 hover:underline font-sans mr-4">{t.profile.readArxiv}</a>
                                        <a href="#" className="text-sm text-academic-accent dark:text-blue-400 hover:underline font-sans">{t.profile.readPdf}</a>
                                    </div>
                                </div>
                            ))}
                         </div>
                    </section>

                    {/* Section: Education */}
                    <section>
                        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 font-sans border-b border-gray-200 dark:border-gray-700 pb-2">{t.profile.education}</h2>
                        <div className="overflow-x-auto">
                            <table className="w-full text-left border-collapse">
                                <tbody>
                                    {EDUCATION.map((edu, idx) => (
                                        <tr key={idx} className="border-b border-gray-100 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                                            <td className="py-3 px-2 font-mono text-sm text-gray-500 dark:text-gray-400 w-32 align-top">{edu.year}</td>
                                            <td className="py-3 px-2 font-serif text-gray-800 dark:text-gray-200 align-top">
                                                <div className="font-bold">{edu.degree}</div>
                                                <div className="text-gray-600 dark:text-gray-400">{edu.institution}</div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </section>

                </div>

                {/* --- RIGHT COLUMN (SIDEBAR) --- */}
                <Sidebar />
            </div>
        </div>
    </div>
  );
};
