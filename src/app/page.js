"use client";

import { useState } from "react";
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
  const [isDark, setIsDark] = useState(true);
  const [copiedEndpoint, setCopiedEndpoint] = useState(null);

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

  const theme = {
    bg: isDark ? "bg-gray-900" : "bg-gray-50",
    cardBg: isDark ? "bg-gray-800" : "bg-white",
    text: isDark ? "text-gray-100" : "text-gray-900",
    textSecondary: isDark ? "text-gray-400" : "text-gray-600",
    border: isDark ? "border-gray-700" : "border-gray-200",
    codeBg: isDark ? "bg-gray-900" : "bg-gray-100",
    accentBg: isDark ? "bg-blue-900/30" : "bg-blue-50",
    accentText: isDark ? "text-blue-400" : "text-blue-600",
    hover: isDark ? "hover:bg-gray-700" : "hover:bg-gray-100",
  };

  return (
    <div
      className={`min-h-screen ${theme.bg} ${theme.text} transition-colors duration-300`}
    >
      {/* Header */}
      <header
        className={`sticky top-0 z-50 backdrop-blur-lg ${
          isDark ? "bg-gray-800/80" : "bg-white/80"
        } border-b ${theme.border}`}
      >
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Database
              className={isDark ? "text-blue-400" : "text-blue-600"}
              size={32}
            />
            <div>
              <h1 className="text-2xl font-bold">API Wilayah Indonesia</h1>
              <p className={`text-sm ${theme.textSecondary}`}>
                RESTful API untuk data wilayah administratif Indonesia
              </p>
            </div>
          </div>
          <button
            onClick={() => setIsDark(!isDark)}
            className={`p-3 rounded-lg ${theme.hover} transition-colors`}
            aria-label="Toggle theme"
          >
            {isDark ? <Sun size={20} /> : <Moon size={20} />}
          </button>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-12">
        {/* Quick Start */}
        <section className="mb-16">
          <div
            className={`${theme.cardBg} rounded-xl p-8 shadow-lg border ${theme.border}`}
          >
            <div className="flex items-center gap-3 mb-4">
              <Code
                className={isDark ? "text-green-400" : "text-green-600"}
                size={24}
              />
              <h2 className="text-2xl font-bold">Quick Start</h2>
            </div>
            <p className={`${theme.textSecondary} mb-6`}>
              Base URL untuk semua endpoint:
            </p>
            <div
              className={`${theme.codeBg} rounded-lg p-4 font-mono text-sm ${theme.accentText} flex items-center justify-between`}
            >
              <code>http://localhost:3000</code>
              <button
                onClick={() =>
                  copyToClipboard("http://localhost:3000", "base-url")
                }
                className={`p-2 rounded ${theme.hover} transition-colors`}
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
              className={isDark ? "text-purple-400" : "text-purple-600"}
              size={28}
            />
            <h2 className="text-3xl font-bold">Endpoints</h2>
          </div>

          <div className="space-y-6">
            {endpoints.map((endpoint) => (
              <div
                key={endpoint.id}
                className={`${theme.cardBg} rounded-xl shadow-lg border ${theme.border} overflow-hidden`}
              >
                <div className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <h3 className="text-xl font-bold mb-2">
                        {endpoint.id}. {endpoint.title}
                      </h3>
                      <p className={theme.textSecondary}>
                        {endpoint.description}
                      </p>
                    </div>
                  </div>

                  {/* Method & Path */}
                  <div
                    className={`${theme.codeBg} rounded-lg p-4 mb-4 flex items-center justify-between`}
                  >
                    <div className="flex items-center gap-3 font-mono text-sm">
                      <span
                        className={`px-3 py-1 rounded font-bold ${
                          isDark
                            ? "bg-green-900 text-green-300"
                            : "bg-green-100 text-green-700"
                        }`}
                      >
                        {endpoint.method}
                      </span>
                      <code className={theme.accentText}>{endpoint.path}</code>
                    </div>
                    <button
                      onClick={() =>
                        copyToClipboard(
                          endpoint.path,
                          `endpoint-${endpoint.id}`
                        )
                      }
                      className={`p-2 rounded ${theme.hover} transition-colors`}
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
                      <div
                        className={`${theme.accentBg} rounded-lg p-4 space-y-2`}
                      >
                        {endpoint.params.map((param, idx) => (
                          <div key={idx} className="flex gap-2">
                            <code
                              className={`${theme.accentText} font-mono text-sm`}
                            >
                              {param.name}
                            </code>
                            <span
                              className={`text-xs px-2 py-0.5 rounded ${
                                param.type === "required"
                                  ? isDark
                                    ? "bg-red-900 text-red-300"
                                    : "bg-red-100 text-red-700"
                                  : isDark
                                  ? "bg-gray-700 text-gray-300"
                                  : "bg-gray-200 text-gray-700"
                              }`}
                            >
                              {param.type}
                            </span>
                            <span className={`${theme.textSecondary} text-sm`}>
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
                    <div
                      className={`${theme.codeBg} rounded-lg p-4 overflow-x-auto`}
                    >
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
          <div
            className={`${theme.cardBg} rounded-xl shadow-lg border ${theme.border} overflow-hidden`}
          >
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className={isDark ? "bg-gray-700" : "bg-gray-100"}>
                  <tr>
                    <th
                      className={`px-6 py-4 text-left font-semibold ${theme.border} border-b`}
                    >
                      Level
                    </th>
                    <th
                      className={`px-6 py-4 text-left font-semibold ${theme.border} border-b`}
                    >
                      Panjang Kode
                    </th>
                    <th
                      className={`px-6 py-4 text-left font-semibold ${theme.border} border-b`}
                    >
                      Contoh
                    </th>
                    <th
                      className={`px-6 py-4 text-left font-semibold ${theme.border} border-b`}
                    >
                      Keterangan
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {levels.map((level, idx) => (
                    <tr
                      key={idx}
                      className={
                        idx % 2 === 0
                          ? isDark
                            ? "bg-gray-800/50"
                            : "bg-gray-50/50"
                          : ""
                      }
                    >
                      <td
                        className={`px-6 py-4 ${theme.border} border-b font-medium`}
                      >
                        {level.level}
                      </td>
                      <td
                        className={`px-6 py-4 ${theme.border} border-b ${theme.textSecondary}`}
                      >
                        {level.length}
                      </td>
                      <td className={`px-6 py-4 ${theme.border} border-b`}>
                        <code
                          className={`${theme.codeBg} px-2 py-1 rounded text-sm ${theme.accentText}`}
                        >
                          {level.example}
                        </code>
                      </td>
                      <td
                        className={`px-6 py-4 ${theme.border} border-b ${theme.textSecondary}`}
                      >
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
          <div
            className={`${
              isDark
                ? "bg-yellow-900/20 border-yellow-700"
                : "bg-yellow-50 border-yellow-200"
            } border-l-4 rounded-r-xl p-6`}
          >
            <h3 className="text-xl font-bold mb-4">📝 Catatan Penting</h3>
            <ul className={`space-y-2 ${theme.textSecondary}`}>
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
                  <code
                    className={`${theme.codeBg} px-2 py-0.5 rounded text-sm`}
                  >
                    success: false
                  </code>{" "}
                  dan field{" "}
                  <code
                    className={`${theme.codeBg} px-2 py-0.5 rounded text-sm`}
                  >
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
      <footer className={`border-t ${theme.border} ${theme.cardBg} mt-20`}>
        <div className="max-w-7xl mx-auto px-6 py-8 text-center">
          <p className={theme.textSecondary}>
            API Wilayah Indonesia - Built with Next.js & ❤️
          </p>
        </div>
      </footer>
    </div>
  );
}
