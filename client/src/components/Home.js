import React from 'react'

export const Home = () => {
  return (

        <body class="flex flex-col w-full h-screen bg-gradient-to-t from-green-300 via-blue-500 to-purple-600">
        <header class="text-4xl text-center py-4 text-white bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 shadow-md">CalmQuest</header> 
        <div class="flex flex-grow">
            <div class="h-full bg-white w-3/10 p-8 flex flex-col justify-between">
                <div>
                    <h2 class="text-2xl mb-4">Search</h2>
                    <input type="search" placeholder="Search..." class="mb-6 w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-100" />

                    <h2 class="text-2xl mb-4">Health Resources</h2>
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
                    <h1 class="text-2xl mb-4 text-center">Welcome to CalmQuest</h1>

                    <p class="mb-6 text-center justify-center">Your Daily Tasks:</p>
                    <ul class="mb-6 text-center">
                        <li class="mb-2">- CalmQuest Hunters mom</li>
                        <li class="mb-2">- Make your bed</li>
                        <li class="mb-2">- Dont kill yourself</li>
                        <li class="mb-2">- Visit the hat man</li>
                    </ul>

                    <p class="mb-6 text-center">Today's Affirming Quote:</p>
                    <p class="italic text-center">"YOOOOOOOOOOOOOOOOOOOOOOO!!!" - Nelson Mandela</p>

                </div>
            </div>
        </div>
    </body>
  )
  
}