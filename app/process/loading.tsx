export default function Loading() {
return (
  <div className="flex flex-col items-center justify-center min-h-screen bg-white">
    <img
      src="https://ik.imagekit.io/j98e6hcfnkn/logo_xIU9EqxGF.png?updatedAt=1747918120501"
      alt="NXG Coatings Logo"
      className="w-24 h-24 mb-6 animate-spin-slow"
      style={{ animation: 'spin 2s linear infinite' }}
    />
    <span className="text-brand-blue text-xl font-semibold">Loading...</span>
    <style jsx>{`
      @keyframes spin {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
      }
      .animate-spin-slow {
        animation: spin 2s linear infinite;
      }
    `}</style>
  </div>
)
}
