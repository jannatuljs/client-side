import React from 'react';

const teamMembers = [
  {
    name: 'John Doe',
    title: 'CEO & Founder',
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTv5T9G-B_94Liv4WQ2W-ulYpOqYM_0Yq6su6KgzQEzHU1InT6k-xEMNQvydTUrtqcPQio&usqp=CAU',   
    description: 'John is the visionary behind the company and leads with a focus on innovation and client success.',
  },
  {
    name: 'Jane Smith',
    title: 'Lead Nutritionist',
    image: 'https://assolutions.ci/voyage/wp-content/uploads/2022/07/p01-1-600x600.jpg',  
    description: 'Jane brings a wealth of experience in nutrition counseling, helping clients achieve their health goals.',
  },
  {
    name: 'Robert Brown',
    title: 'Services Manager',
    image: 'https://media.istockphoto.com/id/1139559852/photo/portrait-of-smiling-handsome-young-man-with-cap-backgroun-with-copy-space.jpg?s=612x612&w=0&k=20&c=zmYwVUyf-vJbSloR9OC7pwIhenEflH53N7LPZ-ifBrc=',  
    description: 'Robert drives our marketing strategies, ensuring our services reach the right audience with a compelling message.',
  },
  {
    name: 'Emily White',
    title: 'Client Support Specialist',
    image: 'https://static.wixstatic.com/media/348b7c_dad6473f1b40403ba41942ba2a72b39f~mv2.jpeg/v1/fill/w_1277,h_1277,al_c,q_85/Emily%20White.jpeg',  
    description: 'Emily is dedicated to providing exceptional client support, always ensuring that every customer feels valued and heard.',
  },
];

const OurTeam = () => {
  return (
    <section className="  py-16 bg-gray-50 ml-3 mr-2">
      <div className="max-w-7xl mx-auto text-center">
        <h2 className="text-3xl font-semibold text-gray-800 mb-8">Meet Our Team</h2>
        <div className="grid  grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {teamMembers.map((member, index) => (
            <div key={index} className="bg-white p-6 border-2  rounded-lg shadow-md hover:shadow-lg transition duration-300 ease-in-out">
              <img 
                src={member.image} 
                alt={member.name} 
                className="w-32 h-32 mx-auto mb-4 rounded-full object-cover"
              />
              <h3 className="text-xl font-semibold text-gray-800">{member.name}</h3>
              <p className="text-gray-600 mb-4">{member.title}</p>
              <p className="text-gray-500">{member.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default OurTeam;
