import React from 'react'

export const Home = () => {
  return (

        <body class="flex flex-col w-full h-screen bg-gradient-to-t from-green-300 via-blue-500 to-purple-600">
        <div class="flex flex-grow">
            <div class="h-full bg-white w-3/10 p-8 flex flex-col justify-between">
                <div>
                    <h2 class="text-3xl mb-4 text-emerald-400">CalmQuest</h2>
                    <button class="text-2xl">Profile</button>
                    <h2 class="text-2xl mt-20 mb-4 text-blue-400">Health Resources</h2>
                    <input type="search" placeholder="Search..." class="mb-6 w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-100" />
                    <ul>
                        <li class="mb-2">Manage Anxiety</li>
                        <li class="mb-2">Keep your heart Healthy</li>
                        <li class="mb-2">Get Enough Sleep</li>
                        <li class="mb-2">Get Active</li>
                        <li class="mb-2">Choosing a Doctor: Quick Tips</li>
                    </ul>
                </div>
                <p>Logout</p>
            </div>
            
            <div class="h-full w-full w-7/10 flex items-start justify-start p-8">
                <div class="bg-white rounded-lg shadow p-8 w-full h-full overflow-auto">
                    <h1 class="text-4xl mb-4 text-center">Welcome to <span class="text-emerald-400">CalmQuest</span></h1>

                    <p class="text-2xl text-center justify-center">Daily Tasks:</p>
                    <ul class="mb-6 text-center">
                        <li class="text-2xl mb-2 bg-gradient-to-l from-white via-blue-200 to-white">- CalmQuest Hunters mom</li>
                        <li class="text-2xl mb-2 bg-gradient-to-l from-white via-blue-200 to-white">- Make your bed</li>
                        <li class="text-2xl mb-2 bg-gradient-to-l from-white via-blue-200 to-white">- Dont kill yourself</li>
                        <li class="text-2xl mb-2 bg-gradient-to-l from-white via-blue-200 to-white">- Visit the hat man</li>
                    </ul>

                    <p class="mb-6 text-center">Today's Affirming Quote:</p>
                    <p class="text-4xl italic text-center bg-gradient-to-l from-emerald-400 via-blue-400 to-emerald-400 bg-clip-text text-transparent">“Do what you can, with what you have, where you are.” ―Theodore Roosevelt.</p>

                </div>
            </div>
        </div>
    </body>
  )
  
}
