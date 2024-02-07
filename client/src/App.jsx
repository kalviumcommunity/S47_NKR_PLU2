import './App.css';
import DestinationCard from './Destination';


const App = () => {
  return (
    <div className="app-container">
      <h1 className="main-title">Piss-Off Prevention Zones: A Girlfriend's Guide</h1>
      <h2 className="sub-title">Avoidable Vacation Destinations</h2>

      <div className="destination-container">
        <DestinationCard
          title="Boredom Beach"
          description="A seemingly endless stretch of sand where the most exciting activity is watching the tide go in and out."
          imageUrl="https://diaryofdennis.files.wordpress.com/2014/04/travemc3bcnde-fake-photo.jpg"
        />
        <DestinationCard
          title="Dullsville City"
          description="Known for its lack of nightlife, this city goes to bed at 8 pm, leaving visitors to fend for themselves in a sea of tranquility."
          imageUrl="https://static.ffx.io/images/$width_1024%2C$height_576/t_crop_fill/q_86%2Cf_auto/b4ec0c0745dce05f78918840ec92dba05e972989"
        />
        <DestinationCard
          title="Museum of Mundane History"
          description="A town that takes pride in its collection of the world's most uninteresting artifacts and exhibits, ensuring visitors leave feeling thoroughly uninspired."
          imageUrl="https://www.apollo-magazine.com/wp-content/uploads/2023/05/lead2_hunterianmuseum.jpg?w=1000"
        />
        <DestinationCard
          title="Snoozeville Spa Resort"
          description="Where relaxation turns into a nap marathon – guests are encouraged to spend their days dozing by the pool."
          imageUrl="https://res.klook.com/klook-hotel/image/upload/fl_lossy.progressive,c_fill,f_auto,w_750,q_85/trip/0225k12000a0gsvdd4D13_R_550_412_R5.jpg"
        />
        <DestinationCard
          title="Mosquito Marsh"
          description="A beautiful wetland destination, but visitors beware, the mosquitoes here are rumored to have their pilot's licenses."
          imageUrl="https://jappliedecologyblog.files.wordpress.com/2020/05/sunset-2847548.jpg?w=1200"
        />
        <DestinationCard
          title="Lethargy Lodge"
          description="A mountain retreat where the air is so thin that even the most adventurous souls end up feeling lethargic and sluggish."
          imageUrl="https://www.kuodatravel.com/wp-content/uploads/2022/10/What-is-Travel-Fatigue.jpg"
        />
        <DestinationCard
          title="Puzzle Peak"
          description="A picturesque mountain range with trails that always seem to lead to dead ends, confusing even the most experienced hikers."
          imageUrl="https://media.newyorker.com/photos/59096fe0019dfc3494ea1fc7/16:9/w_1280,c_limit/Moor-A-Walk-Partway-Through-the-Woods.jpg"
        />
        <DestinationCard
          title="Yawn Canyon"
          description="This once thrilling canyon is now famous for inducing excessive yawning due to its utter lack of excitement."
          imageUrl="https://akm-img-a-in.tosshub.com/indiatoday/images/story/202209/gcfinal.jpg?VersionId=bg3u8taPpuS3ZR2pOasr1WsszNHpAR1D&size=690:388"
        />
        <DestinationCard
          title="Tedium Town"
          description="A charming village where every day feels like Groundhog Day, and the monotony is celebrated as a way of life."
          imageUrl="https://upload.wikimedia.org/wikipedia/commons/1/1d/Boring%2C_Oregon%2C_US.jpg"
        />
        <DestinationCard
          title="Dreary Desert"
          description="An arid landscape where the highlight of the day is finding a cactus that looks slightly more interesting than the others."
          imageUrl="https://w0.peakpx.com/wallpaper/877/432/HD-wallpaper-out-of-place-wrong-stunning-desert-lovely-pure-beautiful-hope-alone-lady-dreary.jpg"
        />
      </div>
    </div>
  );
};

export default App;