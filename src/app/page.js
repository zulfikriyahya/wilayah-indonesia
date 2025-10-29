"use client";

import { useState, useEffect } from "react";
import {
  Moon,
  Sun,
  Code,
  Search,
  Database,
  MapPin,
  Copy,
  Check,
} from "lucide-react";

export default function ApiDocs() {
  const [theme, setTheme] = useState("system");
  const [copiedEndpoint, setCopiedEndpoint] = useState(null);

  useEffect(() => {
    // Load saved theme or use system preference
    const savedTheme = localStorage.getItem("theme") || "system";
    setTheme(savedTheme);
    applyTheme(savedTheme);
  }, []);

  const applyTheme = (newTheme) => {
    const root = document.documentElement;

    if (newTheme === "system") {
      const systemPrefersDark = window.matchMedia(
        "(prefers-color-scheme: dark)"
      ).matches;
      root.classList.toggle("dark", systemPrefersDark);
    } else {
      root.classList.toggle("dark", newTheme === "dark");
    }
  };

  const toggleTheme = () => {
    const newTheme =
      theme === "light" ? "dark" : theme === "dark" ? "system" : "light";
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
    applyTheme(newTheme);
  };

  const copyToClipboard = (text, id) => {
    navigator.clipboard.writeText(text);
    setCopiedEndpoint(id);
    setTimeout(() => setCopiedEndpoint(null), 2000);
  };

  const endpoints = [
    {
      id: 1,
      title: "Get Semua Provinsi",
      method: "GET",
      path: "/api/wilayah/provinsi",
      description: "Menampilkan semua provinsi di Indonesia (kode 2 digit)",
      params: [],
      example: `{
  "success": true,
  "data": [
    { "kode": "11", "nama": "Aceh" },
    { "kode": "12", "nama": "Sumatera Utara" }
  ]
}`,
    },
    {
      id: 2,
      title: "Get Kabupaten/Kota",
      method: "GET",
      path: "/api/wilayah/kabupaten?provinsi=11",
      description: "Menampilkan kabupaten/kota dalam provinsi tertentu",
      params: [
        { name: "provinsi", type: "optional", desc: "Kode provinsi (2 digit)" },
      ],
      example: `{
  "success": true,
  "data": [
    { "kode": "11.01", "nama": "Kabupaten Aceh Selatan" },
    { "kode": "11.02", "nama": "Kabupaten Aceh Tenggara" }
  ]
}`,
    },
    {
      id: 3,
      title: "Get Kecamatan",
      method: "GET",
      path: "/api/wilayah/kecamatan?kabupaten=11.01",
      description: "Menampilkan kecamatan dalam kabupaten/kota tertentu",
      params: [
        {
          name: "kabupaten",
          type: "optional",
          desc: "Kode kabupaten (5 digit)",
        },
      ],
      example: `{
  "success": true,
  "data": [
    { "kode": "11.01.01", "nama": "Bakongan" },
    { "kode": "11.01.02", "nama": "Kluet Utara" }
  ]
}`,
    },
    {
      id: 4,
      title: "Get Kelurahan/Desa",
      method: "GET",
      path: "/api/wilayah/kelurahan?kecamatan=11.01.01",
      description:
        "Menampilkan kelurahan/desa dalam kecamatan tertentu (termasuk kode pos)",
      params: [
        {
          name: "kecamatan",
          type: "optional",
          desc: "Kode kecamatan (8 digit)",
        },
      ],
      example: `{
  "success": true,
  "data": [
    { 
      "kode": "11.01.01.2001", 
      "nama": "Keude Bakongan",
      "kodepos": "23773"
    }
  ]
}`,
    },
    {
      id: 5,
      title: "Get Detail Wilayah",
      method: "GET",
      path: "/api/wilayah/11.01.01.2001",
      description:
        "Menampilkan detail wilayah berdasarkan kode (termasuk kode pos jika ada)",
      params: [],
      example: `{
  "success": true,
  "data": {
    "kode": "11.01.01.2001",
    "nama": "Keude Bakongan",
    "kodepos": "23773"
  }
}`,
    },
    {
      id: 6,
      title: "Search Wilayah",
      method: "GET",
      path: "/api/wilayah/search?q=bakongan",
      description: "Mencari wilayah berdasarkan nama (minimal 3 karakter)",
      params: [
        {
          name: "q",
          type: "required",
          desc: "Kata kunci pencarian (min. 3 karakter)",
        },
        {
          name: "level",
          type: "optional",
          desc: "Filter berdasarkan level (2, 5, 8, 13)",
        },
      ],
      example: `{
  "success": true,
  "data": [
    { "kode": "11.01.01", "nama": "Bakongan" },
    { "kode": "11.01.01.2001", "nama": "Keude Bakongan" }
  ]
}`,
    },
    {
      id: 7,
      title: "Get Wilayah (Advanced)",
      method: "GET",
      path: "/api/wilayah?level=13&page=1&limit=50",
      description: "Menampilkan wilayah dengan pagination dan filter lanjutan",
      params: [
        { name: "page", type: "optional", desc: "Halaman (default: 1)" },
        {
          name: "limit",
          type: "optional",
          desc: "Jumlah data per halaman (default: 50)",
        },
        {
          name: "level",
          type: "optional",
          desc: "Level wilayah (2, 5, 8, 13)",
        },
        { name: "parent", type: "optional", desc: "Kode wilayah parent" },
        { name: "search", type: "optional", desc: "Pencarian nama" },
      ],
      example: `{
  "success": true,
  "data": [...],
  "pagination": {
    "page": 1,
    "limit": 50,
    "total": 83437,
    "totalPages": 1669
  }
}`,
    },
  ];

  const levels = [
    { level: "Provinsi", length: "2 digit", example: "11", desc: "Aceh" },
    {
      level: "Kabupaten/Kota",
      length: "5 digit",
      example: "11.01",
      desc: "Kabupaten Aceh Selatan",
    },
    {
      level: "Kecamatan",
      length: "8 digit",
      example: "11.01.01",
      desc: "Bakongan",
    },
    {
      level: "Kelurahan/Desa",
      length: "13 digit",
      example: "11.01.01.2001",
      desc: "Keude Bakongan",
    },
  ];

  const getThemeIcon = () => {
    if (theme === "light") return <Sun size={20} />;
    if (theme === "dark") return <Moon size={20} />;
    return (
      <div className="relative">
        <Sun size={20} className="absolute" />
        <Moon size={20} className="opacity-50" />
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-colors duration-300">
      {/* Header */}
      <header className="sticky top-0 z-50 backdrop-blur-lg bg-white/80 dark:bg-gray-800/80 border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Database className="text-blue-600 dark:text-blue-400" size={32} />
            <div>
              <h1 className="text-2xl font-bold">API Wilayah Indonesia</h1>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                RESTful API untuk data wilayah administratif Indonesia
              </p>
            </div>
          </div>
          <button
            onClick={toggleTheme}
            className="p-3 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
            aria-label="Toggle theme"
            title={`Current: ${theme}`}
          >
            {getThemeIcon()}
          </button>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-12">
        {/* Quick Start */}
        <section className="mb-16">
          <div className="bg-white dark:bg-gray-800 rounded-xl p-8 shadow-lg border border-gray-200 dark:border-gray-700">
            <div className="flex items-center gap-3 mb-4">
              <Code className="text-green-600 dark:text-green-400" size={24} />
              <h2 className="text-2xl font-bold">Quick Start</h2>
            </div>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              Base URL untuk semua endpoint:
            </p>
            <div className="bg-gray-100 dark:bg-gray-900 rounded-lg p-4 font-mono text-sm text-blue-600 dark:text-blue-400 flex items-center justify-between">
              <code>http://localhost:3000</code>
              <button
                onClick={() =>
                  copyToClipboard("http://localhost:3000", "base-url")
                }
                className="p-2 rounded hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
              >
                {copiedEndpoint === "base-url" ? (
                  <Check size={16} />
                ) : (
                  <Copy size={16} />
                )}
              </button>
            </div>
          </div>
        </section>

        {/* Endpoints */}
        <section className="mb-16">
          <div className="flex items-center gap-3 mb-6">
            <MapPin
              className="text-purple-600 dark:text-purple-400"
              size={28}
            />
            <h2 className="text-3xl font-bold">Endpoints</h2>
          </div>

          <div className="space-y-6">
            {endpoints.map((endpoint) => (
              <div
                key={endpoint.id}
                className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 overflow-hidden"
              >
                <div className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <h3 className="text-xl font-bold mb-2">
                        {endpoint.id}. {endpoint.title}
                      </h3>
                      <p className="text-gray-600 dark:text-gray-400">
                        {endpoint.description}
                      </p>
                    </div>
                  </div>

                  {/* Method & Path */}
                  <div className="bg-gray-100 dark:bg-gray-900 rounded-lg p-4 mb-4 flex items-center justify-between">
                    <div className="flex items-center gap-3 font-mono text-sm">
                      <span className="px-3 py-1 rounded font-bold bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300">
                        {endpoint.method}
                      </span>
                      <code className="text-blue-600 dark:text-blue-400">
                        {endpoint.path}
                      </code>
                    </div>
                    <button
                      onClick={() =>
                        copyToClipboard(
                          endpoint.path,
                          `endpoint-${endpoint.id}`
                        )
                      }
                      className="p-2 rounded hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                    >
                      {copiedEndpoint === `endpoint-${endpoint.id}` ? (
                        <Check size={16} />
                      ) : (
                        <Copy size={16} />
                      )}
                    </button>
                  </div>

                  {/* Parameters */}
                  {endpoint.params.length > 0 && (
                    <div className="mb-4">
                      <h4 className="font-semibold mb-3 flex items-center gap-2">
                        <Search size={16} />
                        Query Parameters:
                      </h4>
                      <div className="bg-blue-50 dark:bg-blue-900/30 rounded-lg p-4 space-y-2">
                        {endpoint.params.map((param, idx) => (
                          <div
                            key={idx}
                            className="flex gap-2 flex-wrap items-center"
                          >
                            <code className="text-blue-600 dark:text-blue-400 font-mono text-sm">
                              {param.name}
                            </code>
                            <span
                              className={`text-xs px-2 py-0.5 rounded ${
                                param.type === "required"
                                  ? "bg-red-100 dark:bg-red-900 text-red-700 dark:text-red-300"
                                  : "bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300"
                              }`}
                            >
                              {param.type}
                            </span>
                            <span className="text-gray-600 dark:text-gray-400 text-sm">
                              - {param.desc}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Example Response */}
                  <div>
                    <h4 className="font-semibold mb-3">Example Response:</h4>
                    <div className="bg-gray-100 dark:bg-gray-900 rounded-lg p-4 overflow-x-auto">
                      <pre className="font-mono text-xs">
                        <code>{endpoint.example}</code>
                      </pre>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Level Kode Wilayah */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-6">Level Kode Wilayah</h2>
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-100 dark:bg-gray-700">
                  <tr>
                    <th className="px-6 py-4 text-left font-semibold border-b border-gray-200 dark:border-gray-700">
                      Level
                    </th>
                    <th className="px-6 py-4 text-left font-semibold border-b border-gray-200 dark:border-gray-700">
                      Panjang Kode
                    </th>
                    <th className="px-6 py-4 text-left font-semibold border-b border-gray-200 dark:border-gray-700">
                      Contoh
                    </th>
                    <th className="px-6 py-4 text-left font-semibold border-b border-gray-200 dark:border-gray-700">
                      Keterangan
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {levels.map((level, idx) => (
                    <tr
                      key={idx}
                      className={
                        idx % 2 === 0 ? "bg-gray-50/50 dark:bg-gray-800/50" : ""
                      }
                    >
                      <td className="px-6 py-4 border-b border-gray-200 dark:border-gray-700 font-medium">
                        {level.level}
                      </td>
                      <td className="px-6 py-4 border-b border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-400">
                        {level.length}
                      </td>
                      <td className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
                        <code className="bg-gray-100 dark:bg-gray-900 px-2 py-1 rounded text-sm text-blue-600 dark:text-blue-400">
                          {level.example}
                        </code>
                      </td>
                      <td className="px-6 py-4 border-b border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-400">
                        {level.desc}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* Notes */}
        <section>
          <div className="bg-yellow-50 dark:bg-yellow-900/20 border-l-4 border-yellow-400 dark:border-yellow-700 rounded-r-xl p-6">
            <h3 className="text-xl font-bold mb-4">📝 Catatan Penting</h3>
            <ul className="space-y-2 text-gray-700 dark:text-gray-300">
              <li className="flex items-start gap-2">
                <span className="text-yellow-500 mt-1">•</span>
                <span>Semua response menggunakan format JSON</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-yellow-500 mt-1">•</span>
                <span>
                  Parameter query bersifat case-insensitive untuk pencarian nama
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-yellow-500 mt-1">•</span>
                <span>
                  Kode pos hanya tersedia untuk kelurahan/desa (level 13 digit)
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-yellow-500 mt-1">•</span>
                <span>
                  Response error akan memiliki{" "}
                  <code className="bg-gray-100 dark:bg-gray-800 px-2 py-0.5 rounded text-sm">
                    success: false
                  </code>{" "}
                  dan field{" "}
                  <code className="bg-gray-100 dark:bg-gray-800 px-2 py-0.5 rounded text-sm">
                    error
                  </code>
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-yellow-500 mt-1">•</span>
                <span>Maximum 100 hasil untuk endpoint search</span>
              </li>
            </ul>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 mt-20">
        <div className="max-w-7xl mx-auto px-6 py-8 text-center">
          <p className="text-gray-600 dark:text-gray-400">
            API Wilayah Indonesia - Built with Next.js & ❤️
          </p>
        </div>
      </footer>
    </div>
  );
}
