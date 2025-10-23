
export default async function CafesPage() {
  let req = await fetch("http://localhost:3000/objects.json")
  let db = await req.json()
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-purple-50/30 pt-32">
      <div className="container">
        <h1 className="text-4xl font-bold mb-8">🍽️ Кафе и рестораны Донецка</h1>
        {db.filter(item => item.type == 3).map((object) => (
          <li>
            <h3>{object.name}</h3>
          </li>
        )

        )}
      </div>
    </div>
  )
}