import LanguageMarquee from "@/components/custom/elements/Home/LanguageMarquee";
import BackgroundBeamsWithCollisionPage from "@/components/custom/elements/Home/BackgroundBeamsWithCollision"
import { HeroScrollDemo } from "../elements/Home/HeroScrollDemo";
import Lamp from "../fragments/Lamp";

const Home = () => {
    return (
        <div className="font-sans bg-background -translate-y-8 border-b-2 border-secondary">
            <div className="min-h-[80vh] rounded-md" >
                <BackgroundBeamsWithCollisionPage />
            </div>
            <Lamp />
            <div className="border-b-2 mb-16 border-secondary">
                <LanguageMarquee />
            </div>
            <div>
                <div className="flex flex-row justify-start bg-background ml-4">
                    <HeroScrollDemo
                        title="Explore Terminal"
                        content="Discover the Input and Output section of SyntaxSpace Rich CodeEditor."
                        imageUrl="/src/assets/IntegratedTerminal(Text&FileIO).png"
                    />
                </div>
                <div className="flex flex-row justify-end bg-background mr-4">
                    <HeroScrollDemo
                        title="Explore Creativity"
                        content="Discover endless possibilities."
                        imageUrl="/src/assets/SecureAuthentication(Google&Custom).png"
                    />
                </div>
            </div>
        </div>
    );
};

export default Home;
