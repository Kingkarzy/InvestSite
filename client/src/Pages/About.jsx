import Divider from '../components/Divider';
import TeamCard from '../components/TeamCard';
import img1 from '../assets/images/img3.webp';

const About = () => {
  return (
    <div className='flex justify-center items-center mb-32'>
      <div className='w-full h-auto flex flex-col'>
        <div className='contact-header bg-no-repeat bg-cover bg-bg2 bg-center z-20 w-full h-96 mb-20 flex flex-col object-contain justify-center'>
          <h1 className='text-5xl font-bold text-white mb-6 text-center ml-0'>
            About Us
          </h1>
          <h3 className='text-xl font-medium text-yellow-450 mb-5 text-center'>
            Integrity. Excellence. Results.
          </h3>
        </div>

        <div
          className=' w-10/12 md:w-9/12 flex text-black place-self-center flex-col mb-16'
          id='who-we-are'
        >
          <div className='h-auto w-full sm:w-full place-self-center gap-5  mt-5 flex flex-col sm:flex-row p-6 md:p-14 bg-gray-50 rounded-xl justify-around'>
            <div className='w-full sm:w-1/2 h-full flex justify-center place-self-center'>
              <div className='flex flex-col gap-5'>
                <h2 className='font-medium text-xl md:text-4xl text-green-800 mt-2 sm:mt-0  sm:mb-0'>
                  Who We Are?
                </h2>
                <p className='text-l lg:text-xl sm:text-sm font-light text-justify sm:text-left leading-normal  mb-5 md:mb-3'>
                  We are strong supporters of Cryptocurrency,
                  blockchain technology and forex trading. We hope to
                  contribute as much as possible to keep the
                  investment community alive and growing. Our vision
                  is to develop along with our clients and make us the
                  finest investment company. Our aim is to build a
                  great relationship with you by providing you top
                  quality service.
                </p>
              </div>
            </div>

            <div className='w-full h-72 sm:w-3/5 sm:h-auto flex flex-col justify-center mb-8 sm:mb-0'>
              <img
                src={img1}
                alt=''
                className='w-full rounded-xl shadow-lg'
              />
            </div>
          </div>
        </div>
        <Divider />
        <div className='items-center justify-center'>
          <h1 className='mb-10 text-4xl text-center font-semibold text-black'>
            Our Team
          </h1>
          <p className='mb-10 px-5 font-light text-center text-gray-400'>
            A great vision requires a great team
          </p>
          <div className='w-full justify-center items-center mx-auto flex lg:flex-row lg:col-span-4 gap-5 md:col-span-2  flex-col'>
            <TeamCard
              image={img1}
              name='Ryan Williams'
              title='CEO'
            />
            <TeamCard
              image={img1}
              name='Tom Wesley'
              title='Lead Investment Officer'
            />
            <TeamCard
              image={img1}
              name='Alexander Jeffrey'
              title='CTO'
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
