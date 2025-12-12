'use client';

import { useState, useEffect } from 'react';

type HomeData = {
  name: string;
  role: string;
  bio: string;
  social: { name: string; url: string }[];
  projects: { title: string; description: string; link?: string }[];
};

export default function Home() {
  const [data, setData] = useState<HomeData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('https://raw.githubusercontent.com/ssyang/ssyang.github.io/main/src/data/data.json')
      .then(res => res.json())
      .then(json => {
        setData(json);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  if (loading) return <div className="text-center py-20 text-2xl">로딩 중...</div>;
  if (!data) return <div className="text-center py-rouge-500">데이터 로드 실패</div>;

  return (
    <>
      <main className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 text-white">
        <div className="max-w-5xl mx-auto px-6 py-20">
          {/* Hero */}
          <div className="text-center mb-20">
            <h1 className="text-6xl md:text-7xl font-bold mb-6">
              {data.name}
            </h1>
            <p className="text-2xl md:text-3xl text-cyan-400 mb-6">
              {data.role}
            </p>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              {data.bio}
            </p>
          </div>

          {/* Social Links */}
          <div className="flex justify-center gap-6 mb-20">
            {data.social.map((s) => (
              <a
                key={s.name}
                href={s.url}
                target="_blank"
                rel="noopener noreferrer"
                className="p-4 bg-white/10 backdrop-blur rounded-xl hover:bg-white/20 transition"
              >
                <span className="text-2xl">{s.name}</span>
              </a>
            ))}
          </div>

          {/* Projects */}
          <h2 className="text-4xl font-bold text-center mb-12">Projects</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {data.projects.map((p, i) => (
              <div
                key={i}
                className="bg-white/5 backdrop-blur border border-white/10 rounded-2xl p-8 hover:border-cyan-400 transition"
              >
                <h3 className="text-2xl font-semibold mb-3">{p.title}</h3>
                <p className="text-gray-300 mb-6">{p.description}</p>
                {p.link && (
                  <a
                    href={p.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-cyan-400 hover:text-cyan-300"
                  >
                    방문하기 →
                  </a>
                )}
              </div>
            ))}
          </div>
        </div>
      </main>
    </>
  );
}