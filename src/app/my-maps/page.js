import Link from "next/link"

// async function getMap() {
//     const res = await fetch('/api/geocode')

//     if (!res.ok) {
//         throw new Error('failed to fetch');
//     }

//     return res.json();
// }

export default async function MyMap() {
    // const data = await getMap()

    return (
        <div>
            <p>My Maps</p>
        </div>
    )
}


