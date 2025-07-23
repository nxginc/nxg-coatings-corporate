export default function Loading() {
return (
  <div className="flex flex-col items-center justify-center min-h-screen bg-white">
    <img
      src="https://ik.imagekit.io/j98e6hcfnkn/logo_xIU9EqxGF.png?updatedAt=1747918120501"
      alt="NXG Coatings Logo"
      className="w-24 h-24 mb-6 animate-spin"
    />
    <span className="text-brand-blue text-xl font-semibold">Loading...</span>
  </div>
)
}
