import { VideoDescription } from "./components/VideoDescription";
import { DynamicContent } from "./components/DynamicContent";
import { VideoPlayer } from "./components/VideoPlayer";
import "./index.css";

function App() {
  return (
    <main className="py-12 px-5">
      <div className="mx-auto w-full max-w-4xl">
        <VideoDescription />
        <VideoPlayer />
        <DynamicContent />
      </div>
    </main>
  );
}

export default App;
