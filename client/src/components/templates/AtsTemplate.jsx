import React from "react";
import { Mail, Phone, MapPin, Linkedin, Globe } from "lucide-react";

const ATSTemplate = ({ data, accentColor = "#000000" }) => {
    const formatDate = (dateStr) => {
        if (!dateStr) return "";
        const [year, month] = dateStr.split("-");
        return new Date(year, month - 1).toLocaleDateString("en-US", {
            year: "numeric",
            month: "short"
        });
    };

    const SectionHeader = ({ title }) => (
        <div className="mb-2 mt-4 break-after-avoid">
            <h2 className="text-[11pt] font-bold tracking-wider uppercase" style={{ color: accentColor }}>
                {title}
            </h2>
            <hr className="mt-0.5" style={{ borderTop: `1.5px solid ${accentColor}` }} />
        </div>
    );

    return (
        <>
            {/* 1. Global Print Styles */}
            <style>{`
                @media print {
                    @page {
                        margin: 20mm; /* Standard professional margin */
                    }
                    body {
                        -webkit-print-color-adjust: exact;
                    }
                    /* Forces a gap at the top of subsequent pages */
                    .print-section {
                        break-inside: avoid;
                        page-break-inside: avoid;
                        margin-bottom: 1rem;
                    }
                }
            `}</style>

            <div className="max-w-4xl mx-auto p-12 bg-white text-black leading-[1.3] font-serif min-h-screen">
                {/* Header - No break avoid needed here */}
                <header className="text-center mb-6">
                    <h1 className="text-3xl font-normal tracking-wide mb-2 uppercase" style={{ color: accentColor }}>
                        {data.personal_info?.full_name || "Your Name"}
                    </h1>

                    <div className="flex flex-wrap justify-center items-center gap-x-3 text-[10pt] text-gray-800">
                        {data.personal_info?.linkedin && (
                            <span className="flex items-center gap-1">
                                <Linkedin className="size-3" style={{ color: accentColor }} /> 
                                {data.personal_info.linkedin.replace(/^https?:\/\//, '')}
                            </span>
                        )}
                        <span className="text-gray-300">|</span>
                        {data.personal_info?.email && (
                            <span className="flex items-center gap-1 font-medium">
                                <Mail className="size-3" style={{ color: accentColor }} /> 
                                {data.personal_info.email}
                            </span>
                        )}
                        <span className="text-gray-300">|</span>
                        {data.personal_info?.phone && (
                            <span className="flex items-center gap-1">
                                <Phone className="size-3 fill-current" style={{ color: accentColor }} /> 
                                {data.personal_info.phone}
                            </span>
                        )}
                    </div>
                </header>

                {/* Wrapped sections in print-section to prevent awkward page splits */}
                
                {data.professional_summary && (
                    <section className="print-section">
                        <SectionHeader title="Summary" />
                        <p className="text-[10pt] text-gray-800 text-justify">
                            {data.professional_summary}
                        </p>
                    </section>
                )}

                {data.experience && data.experience.length > 0 && (
                    <section className="print-section">
                        <SectionHeader title="Work Experience" />
                        <div className="space-y-4">
                            {data.experience.map((exp, index) => (
                                <div key={index} className="break-inside-avoid">
                                    <div className="flex justify-between items-baseline font-bold text-[10.5pt]">
                                        <span style={{ color: accentColor }}>{exp.position}</span>
                                        <span>
                                            {formatDate(exp.start_date)} – {exp.is_current ? "Present" : formatDate(exp.end_date)}
                                        </span>
                                    </div>
                                    <div className="text-[10pt] italic mb-1 text-gray-700">{exp.company}</div>
                                    {exp.description && (
                                        <ul className="list-disc ml-5 text-[10pt] space-y-1 text-gray-800">
                                            {exp.description.split('\n').map((bullet, idx) => (
                                                <li key={idx}>{bullet.replace(/^[•-]\s*/, '')}</li>
                                            ))}
                                        </ul>
                                    )}
                                </div>
                            ))}
                        </div>
                    </section>
                )}

                {data.project && data.project.length > 0 && (
                    <section className="print-section">
                        <SectionHeader title="Projects" />
                        <div className="space-y-3">
                            {data.project.map((proj, index) => (
                                <div key={index} className="break-inside-avoid">
                                    <div className="flex justify-between items-baseline">
                                        <span className="font-bold text-[10.5pt]" style={{ color: accentColor }}>{proj.name}</span>
                                    </div>
                                    <p className="text-[10pt] text-gray-800">{proj.description}</p>
                                </div>
                            ))}
                        </div>
                    </section>
                )}

                {data.education && data.education.length > 0 && (
                    <section className="print-section">
                        <SectionHeader title="Education" />
                        <div className="space-y-2">
                            {data.education.map((edu, index) => (
                                <div key={index} className="grid grid-cols-[100px_1fr_auto] gap-2 text-[10pt] break-inside-avoid">
                                    <span className="text-gray-600">
                                        {edu.graduation_date ? new Date(edu.graduation_date).getFullYear() : ""}
                                    </span>
                                    <div>
                                        <span className="font-bold">{edu.degree}</span> in {edu.field || "Subject"} at <span className="font-bold">{edu.institution}</span>
                                    </div>
                                    {edu.gpa && <span className="font-semibold italic">(GPA: {edu.gpa})</span>}
                                </div>
                            ))}
                        </div>
                    </section>
                )}

                {data.skills && data.skills.length > 0 && (
                    <section className="print-section">
                        <SectionHeader title="Skills" />
                        <div className="grid grid-cols-[100px_1fr] text-[10pt]">
                            <span className="font-bold italic" style={{ color: accentColor }}>Core Skills</span>
                            <span className="text-gray-800">{data.skills.join(", ")}</span>
                        </div>
                    </section>
                )}

                <p className="mt-8 text-center text-[8pt] text-gray-400 italic print:mt-12">
                    Last updated: {new Date().toLocaleDateString("en-US", { month: 'long', day: 'numeric', year: 'numeric' })}
                </p>
            </div>
        </>
    );
};

export default ATSTemplate;