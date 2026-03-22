import { FileText, Globe, Download, CheckCircle2 } from 'lucide-react'

const pdfFeatures = [
  'Platform Overview & Architecture',
  'Authentication Flow (3-step)',
  'All 8 Module Specifications',
  'Distributed Lock Mechanism',
  'Risk Rule Engine Reference',
  'Design System & Tech Stack',
]

const htmlFiles = [
  { name: 'index.html', desc: 'Entry point', color: 'text-cyan-400' },
  { name: 'assets/index-*.css', desc: 'Styles (Tailwind)', color: 'text-cyan-400' },
  { name: 'assets/index-*.js', desc: 'Application bundle', color: 'text-cyan-400' },
]

export function Export() {
  return (
    <div className="space-y-6">
      {/* Header (empty, breadcrumb shown in Layout) */}
      <div className="flex flex-col items-center py-8">
        <div className="w-16 h-16 bg-blue-500/10 rounded-2xl flex items-center justify-center mb-4">
          <FileText className="text-blue-400" size={30} />
        </div>
        <h1 className="text-2xl font-bold text-white mb-1">Export Prototype</h1>
        <p className="text-gray-400 text-sm">Download the NexaPay prototype as HTML or PDF documentation</p>
      </div>

      <div className="max-w-2xl mx-auto space-y-4">
        {/* PDF Documentation */}
        <div className="bg-[#161b22] border border-gray-800 rounded-xl p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <FileText className="text-gray-400" size={20} />
              <h2 className="font-semibold text-white">PDF Documentation</h2>
            </div>
            <span className="text-xs px-2 py-1 bg-gray-700 text-gray-400 rounded-lg">12 Pages</span>
          </div>
          <div className="grid grid-cols-2 gap-2 mb-5">
            {pdfFeatures.map(f => (
              <div key={f} className="flex items-center gap-2">
                <CheckCircle2 className="text-cyan-400 flex-shrink-0" size={14} />
                <span className="text-xs text-gray-400">{f}</span>
              </div>
            ))}
          </div>
          <button className="w-full flex items-center justify-center gap-2 py-3 bg-cyan-500 hover:bg-cyan-400 text-black rounded-xl font-semibold text-sm transition-colors">
            <Download size={16} />
            Download PDF Documentation
          </button>
        </div>

        {/* HTML Static Site */}
        <div className="bg-[#161b22] border border-gray-800 rounded-xl p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <Globe className="text-gray-400" size={20} />
              <h2 className="font-semibold text-white">HTML Static Site</h2>
            </div>
            <span className="text-xs px-2 py-1 bg-cyan-500/20 text-cyan-400 rounded-lg border border-cyan-500/30">Interactive</span>
          </div>
          <div className="space-y-2 mb-5">
            {htmlFiles.map(f => (
              <div key={f.name} className="flex items-center justify-between p-3 bg-[#0d1117] border border-gray-800 rounded-lg">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="text-cyan-400" size={14} />
                  <code className={`text-xs font-mono ${f.color}`}>{f.name}</code>
                </div>
                <span className="text-xs text-gray-500">{f.desc}</span>
              </div>
            ))}
          </div>
          <button className="w-full flex items-center justify-center gap-2 py-3 bg-gray-700 hover:bg-gray-600 text-white rounded-xl font-semibold text-sm transition-colors">
            <Download size={16} />
            Download nexapay-prototype.zip
          </button>
        </div>

        {/* Usage Instructions */}
        <div className="bg-[#161b22] border border-gray-800 rounded-xl p-6">
          <div className="flex items-center gap-3 mb-4">
            <Globe className="text-gray-400" size={20} />
            <h2 className="font-semibold text-white">Usage Instructions</h2>
          </div>
          <ol className="space-y-2">
            {[
              'Unzip the downloaded file to any folder',
              <>Open <code className="text-xs bg-gray-800 px-1.5 py-0.5 rounded font-mono text-cyan-400">index.html</code> in a browser, or serve with any static server</>,
              <>For routing support, use: <code className="text-xs bg-gray-800 px-1.5 py-0.5 rounded font-mono text-cyan-400">npx serve -s .</code></>,
            ].map((item, i) => (
              <li key={i} className="flex items-start gap-3 text-sm text-gray-400">
                <span className="text-gray-600 font-medium flex-shrink-0">{i + 1}.</span>
                <span>{item}</span>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </div>
  )
}
