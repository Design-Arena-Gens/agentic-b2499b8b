import { NextResponse } from 'next/server';
import JSZip from 'jszip';

const captions = [
  {
    caption: "A scarlet sentinel perches in morning light, his brilliant crimson plumage catching the first rays of dawn. Cardinals symbolize hope and renewal, reminding us that even in winter's grasp, beauty persists. This male's vibrant red serves both as a beacon to potential mates and a testament to nature's artistry.",
    hashtags: "#CardinalBird #NorthernCardinal #BirdPhotography #WildlifePhotography #NatureLovers #BirdWatching #BackyardBirds #CardinalSighting #RedBird #BirdsOfInstagram #WildBirds #NaturePhotography #FeatheredFriends #BirdLife #CardinalBeauty"
  },
  {
    caption: "She may lack her mate's brilliant red, but this female cardinal's subtle beauty is equally captivating. Her warm tan and olive plumage provides perfect camouflage while nesting, and those touches of red on wings and crest hint at the genetic fire within. True elegance doesn't always shout.",
    hashtags: "#FemaleCardinal #BirdWatching #CardinalBird #NaturePhotography #BackyardBirds #WildlifeLovers #BirdsOfPrey #BirdLife #NaturalBeauty #CardinalFemale #BirdingDaily #UrbanWildlife #NativeBirds #BirdsOfNorthAmerica #WildlifeConservation"
  },
  {
    caption: "Winter's ambassador arrives at the feeder, a splash of crimson against pristine snow. Cardinals don't migrate, choosing instead to brave the cold months with us. Their presence during holidays has made them symbols of visited loved ones and Christmas cheer across North America.",
    hashtags: "#WinterBirds #CardinalInSnow #WinterWildlife #SnowBirds #CardinalBird #BackyardBirding #WinterPhotography #NorthernCardinal #SeasonalWildlife #HolidayBirds #CardinalSighting #WinterNature #BirdFeeder #ChristmasBird #WildlifeWinter"
  },
  {
    caption: "That distinctive crest isn't just for show—it's a mood indicator! When raised tall like this, our cardinal friend is alert and curious. When flattened, it may signal aggression or fear. Learning to read these subtle cues helps us understand the complex emotional lives of our feathered neighbors.",
    hashtags: "#BirdBehavior #CardinalCrest #BirdWatching #AnimalBehavior #CardinalBird #WildlifeBiology #BirdScience #NatureEducation #BackyardBirds #BirdFacts #CardinalFeatures #Ornithology #BirdStudy #WildlifeEducation #NaturalHistory"
  },
  {
    caption: "A juvenile cardinal shows the awkward beauty of youth—not quite the brilliant red of adulthood, but already displaying that characteristic strong beak and proud stance. In a few months, he'll complete his transformation, but right now he's a perfect reminder that all greatness starts somewhere humble.",
    hashtags: "#JuvenileCardinal #BabyBirds #YoungCardinal #BirdDevelopment #CardinalGrowth #BackyardWildlife #BirdWatching #NaturePhotography #WildlifeDevelopment #BirdLife #CardinalJuvenile #NatureCycle #BirdingCommunity #WildlifePhotography #NatureLovers"
  },
  {
    caption: "Caught mid-song! That powerful beak opens to release the cardinal's distinctive 'cheer-cheer-cheer' call. Both males and females sing—unusual among North American birds. Their varied repertoire includes over 25 different songs, each serving different purposes from territory defense to mate attraction.",
    hashtags: "#BirdSong #SingingBird #CardinalCall #BirdWatching #CardinalBird #NatureSound #WildlifeSounds #BirdVocalization #BackyardBirds #CardinalSinging #BirdsOfInstagram #NaturePhotography #WildlifePhotography #BirdMusic #OrnithologyLove"
  },
  {
    caption: "Sunset paints the sky as a cardinal stakes his claim atop a weathered fence post. These territorial birds will fiercely defend their chosen areas, sometimes even attacking their own reflections in windows. That fighting spirit, combined with their stunning appearance, has made them the state bird of seven U.S. states!",
    hashtags: "#CardinalBird #SunsetBirds #StateBird #TerritorialBirds #WildlifePhotography #GoldenHour #BackyardBirds #BirdWatching #CardinalSighting #EveningWildlife #NaturePhotography #BirdingDaily #WildlifeSunset #CardinalPerch #NaturalBeauty"
  },
  {
    caption: "Love is in the air! Male cardinals are devoted partners, often feeding their mates beak-to-beak during courtship and while she incubates eggs. This tender behavior, combined with their year-round presence together, has made cardinal pairs a symbol of lasting love and devotion.",
    hashtags: "#CardinalCouple #BirdLove #CardinalMate #WildlifeRomance #BirdCouples #CardinalPair #NatureRomance #BackyardBirds #BirdWatching #CardinalCourtship #LoveInNature #WildlifePhotography #MatingBirds #CardinalFamily #BirdingLife"
  },
  {
    caption: "Breakfast time! This cardinal has discovered the sunflower seed buffet. Their powerful beaks can crack even the toughest seeds with ease. Cardinals prefer platform or hopper feeders and enjoy seeds, berries, and insects. Want to attract them? Offer black oil sunflower seeds and watch your yard come alive with red!",
    hashtags: "#BirdFeeding #CardinalFeeder #BackyardBirds #BirdWatching #CardinalBird #FeederBirds #BirdFood #SunflowerSeeds #WildlifeFriendly #BirdFeederFun #AttractingBirds #BackyardWildlife #BirdingTips #CardinalDiet #NatureLovers"
  },
  {
    caption: "Perched among autumn leaves, this cardinal creates a living masterpiece. The complementary colors—red against golden browns and greens—show why nature is the ultimate artist. Cardinals molt once a year in late summer, ensuring their plumage looks its finest when breeding season arrives in spring.",
    hashtags: "#AutumnBirds #FallWildlife #CardinalBird #AutumnColors #FallPhotography #CardinalInFall #SeasonalBirds #NatureArt #BackyardBirds #BirdWatching #FallNature #CardinalPlumage #WildlifePhotography #AutumnBeauty #NatureColors"
  },
  {
    caption: "A rare moment of vulnerability—this cardinal enjoys a refreshing bath. Birds bathe to maintain feather health, crucial for flight and insulation. A simple birdbath can transform your yard into a wildlife sanctuary, offering birds relief from heat and helping them maintain their magnificent plumage.",
    hashtags: "#BirdBath #BathingBirds #CardinalBath #BackyardBirds #BirdWatching #CardinalBird #BirdCare #WildlifeWater #BirdBathTime #BackyardWildlife #BirdHabitat #WildlifeFriendly #CardinalCare #NaturePhotography #BirdingDaily"
  },
  {
    caption: "Spring has sprung, and this cardinal surveys his domain from a flowering branch. As one of the first birds to begin singing in the morning and last to stop at night, cardinals bookend our days with their cheerful melodies. Their presence signals the changing seasons and nature's eternal cycle.",
    hashtags: "#SpringBirds #CardinalInSpring #SpringWildlife #FloweringBranch #CardinalBird #SpringNature #BirdWatching #SeasonalBirds #BackyardBirds #SpringPhotography #CardinalSinging #NatureRenewal #WildlifePhotography #SpringBeauty #BirdingSpring"
  },
  {
    caption: "The female cardinal proves that strength comes in subtle packages. While her mate attracts attention, she makes crucial decisions about nest placement and primarily handles incubation duties. Her drab coloring protects both eggs and nestlings from predators—nature's perfect design for a devoted mother.",
    hashtags: "#FemaleCardinal #BirdMother #NestingBirds #CardinalNest #BirdWatching #CardinalBird #MotherNature #BackyardBirds #BirdingLife #CardinalFemale #WildlifeMoms #NatureDesign #BirdParenting #WildlifePhotography #CardinalFamily"
  },
  {
    caption: "Cardinal silhouette against a pastel sky—nature's own minimalist artwork. Even in shadow, that distinctive crest and robust shape are unmistakable. These birds have become so iconic that many people report feeling visited by deceased loved ones when a cardinal appears, a touching testament to their cultural significance.",
    hashtags: "#BirdSilhouette #CardinalSilhouette #NatureArt #MinimalistNature #CardinalBird #SilhouettePhotography #BirdWatching #BackyardBirds #ArtInNature #CardinalShape #WildlifeArt #NaturePhotography #BirdProfile #CardinalBeauty #SpiritualNature"
  },
  {
    caption: "This cardinal has found prime real estate—a sturdy branch with clear sightlines. Males establish territories of 2-10 acres and patrol them vigilantly. Their confident posture and alert gaze remind us that even small creatures can command great presence when they know their worth.",
    hashtags: "#CardinalTerritory #BirdBehavior #CardinalBird #TerritorialBirds #BackyardBirds #BirdWatching #WildlifeBehavior #CardinalPerch #NaturePhotography #BirdLife #CardinalMale #WildlifePhotography #BirdingDaily #NaturalBehavior #CardinalWatch"
  },
  {
    caption: "Snow dusts the branches, but this cardinal's crimson coat provides natural insulation. Their feathers trap air to create warmth, allowing them to survive temperatures well below freezing. Cardinals also fluff their feathers and tuck one leg at a time into their chest to conserve heat—tiny survival artists!",
    hashtags: "#WinterCardinal #ColdWeatherBirds #CardinalInSnow #WinterWildlife #CardinalBird #WinterBirds #BackyardBirds #BirdSurvival #WinterNature #SnowBirds #CardinalWinter #WildlifeAdaptation #BirdWatching #ColdWeatherWildlife #NatureResilience"
  },
  {
    caption: "A cardinal pair shares a tender moment on a frosty morning. These monogamous birds often stay together year-round, and some pairs mate for life. The male's bright red plumage contrasts beautifully with his mate's subtle elegance—proof that partnerships work best when each brings unique strengths.",
    hashtags: "#CardinalPair #BirdCouple #MonogamousBirds #CardinalLove #BirdWatching #CardinalBird #WildlifeRomance #BackyardBirds #CardinalMates #BirdPairs #NaturePhotography #WildlifePhotography #CardinalTogether #BirdingLife #LoveInNature"
  },
  {
    caption: "Raindrops bead on waterproof feathers as this cardinal waits out the storm. Birds oil their feathers with secretions from a gland near their tail, creating a protective coating. This cardinal's calm patience reminds us that sometimes the wisest action is to weather the storm with grace.",
    hashtags: "#RainyDayBirds #CardinalInRain #WetWeatherBirds #CardinalBird #RainPhotography #BirdWatching #BackyardBirds #WeatheringStorms #WildlifePhotography #RainDrops #CardinalPatience #NaturePhotography #BirdInRain #WildlifeResilience #NatureMoments"
  },
  {
    caption: "This cardinal's brilliant red comes from carotenoid pigments in their diet—especially from berries and fruits. The brighter the red, the healthier the bird and the more attractive to potential mates. It's nature's way of saying 'you are what you eat,' with the most conscientious eaters getting the best partners!",
    hashtags: "#CardinalRed #BirdPigments #CardinalColor #BirdWatching #CardinalBird #BirdDiet #NatureScience #BackyardBirds #CardinalHealth #WildlifeScience #BirdBiology #CardinalBeauty #Ornithology #NatureEducation #BirdFacts"
  },
  {
    caption: "Perched on a cardinal flower—nature's delightful coincidence! Both share the same vibrant red hue, named after the red vestments worn by Catholic cardinals. This double dose of crimson creates a stunning natural display that photographers and nature lovers dream of capturing.",
    hashtags: "#CardinalFlower #RedOnRed #NatureCoincidence #CardinalBird #FlowerAndBird #BirdWatching #NaturalBeauty #BackyardBirds #CardinalPerch #WildlifePhotography #BotanicalBirds #NaturePhotography #RedBeauty #CardinalMatch #GardenBirds"
  },
  {
    caption: "Early morning mist surrounds this cardinal's silhouette. These birds are crepuscular, most active at dawn and dusk. Their cheerful songs break the morning silence, earning them the nickname 'alarm clock of nature.' For many, a cardinal's song is the soundtrack to coffee and contemplation.",
    hashtags: "#MorningBirds #DawnCardinal #CardinalBird #MorningWildlife #BirdWatching #CrepuscularBirds #BackyardBirds #MorningNature #CardinalSong #DawnPhotography #WildlifePhotography #MorningSong #CardinalMorning #NaturePhotography #BirdingDawn"
  },
  {
    caption: "This female cardinal demonstrates perfect balance on a swaying branch. Cardinals have strong, grasping feet with three toes forward and one back—perfect for perching. They can grip branches even while sleeping, a remarkable evolutionary adaptation that keeps them safe from predators through the night.",
    hashtags: "#CardinalPerching #BirdBalance #FemaleCardinal #CardinalBird #BirdFeet #BirdWatching #BackyardBirds #WildlifeAdaptation #CardinalFemale #BirdAnatomy #NaturePhotography #WildlifePhotography #BirdingDaily #CardinalFeatures #NatureDesign"
  },
  {
    caption: "A juvenile cardinal's first winter—his plumage shows the transition from youth to adulthood. Young cardinals remain with parents for several weeks after fledging, learning crucial survival skills. This extended family time creates strong bonds and ensures the next generation thrives.",
    hashtags: "#YoungCardinal #JuvenileCardinal #BirdDevelopment #CardinalBird #BirdFamily #BackyardBirds #BirdWatching #WildlifePhotography #CardinalYouth #BirdGrowth #NaturePhotography #FledglingBird #CardinalLearning #WildlifeDevelopment #BirdParenting"
  },
  {
    caption: "Berries provide essential nutrition, especially in winter when insects are scarce. This cardinal's diet flexibility—from seeds to fruits to insects—allows them to thrive across diverse habitats. Native berry-producing plants in your yard create a natural cardinal cafeteria!",
    hashtags: "#CardinalDiet #BirdsAndBerries #CardinalEating #BackyardBirds #BirdWatching #CardinalBird #NativePlants #WildlifeFriendly #BirdFood #CardinalNutrition #WildlifeGardening #NaturePhotography #BerryBirds #CardinalFeeding #NaturalHabitat"
  },
  {
    caption: "This cardinal strikes a noble pose, and with good reason—he's one of nature's success stories. While many bird populations decline, cardinals have expanded their range northward over the past century, thanks to bird feeders and habitat adaptation. Their resilience offers hope for wildlife conservation.",
    hashtags: "#CardinalSuccess #WildlifeConservation #CardinalBird #ConservationWin #BackyardBirds #BirdWatching #ResilientWildlife #CardinalRange #WildlifePhotography #NaturePhotography #BirdConservation #CardinalExpansion #ConservationHope #BirdingCommunity #NatureResilience"
  },
  {
    caption: "A cardinal investigates a potential nesting site. Females build nests in dense shrubs or low trees, weaving twigs, bark, and grasses into cup-shaped homes. Males bring materials but females do the construction—she's the architect and builder of the cardinal family!",
    hashtags: "#CardinalNest #NestBuilding #BirdNesting #CardinalBird #BirdWatching #BackyardBirds #NestingSeason #WildlifePhotography #CardinalHome #BirdArchitect #NaturePhotography #CardinalFamily #BirdNests #WildlifeHabitat #SpringNesting"
  },
  {
    caption: "Golden hour transforms this cardinal into a glowing ember. Photographers wait for this magical time when low-angle light makes colors pop. But for cardinals, every hour is golden hour—their red plumage evolved to stand out in dappled forest light, catching rays like living stained glass.",
    hashtags: "#GoldenHourBirds #CardinalGoldenHour #CardinalBird #BirdPhotography #GoldenHourWildlife #BackyardBirds #BirdWatching #MagicHour #CardinalGlow #WildlifePhotography #NaturePhotography #CardinalBeauty #PhotographyMagic #BirdingLife #NatureGoldenHour"
  },
  {
    caption: "This cardinal's alert posture shows their constant vigilance. With predators like hawks, owls, and cats posing threats, survival means staying aware. Their distinctive 'chip' alarm call warns other birds of danger—cardinals serve as sentries for entire backyard bird communities.",
    hashtags: "#AlertCardinal #BirdBehavior #CardinalBird #PredatorAwareness #BirdWatching #BackyardBirds #WildlifeBehavior #CardinalAlert #BirdSurvival #NaturePhotography #WildlifePhotography #CardinalWatch #BirdCommunication #BirdingDaily #WildlifeSafety"
  },
  {
    caption: "Fog obscures the background, focusing all attention on this cardinal's magnificent form. In nature photography and in life, sometimes obstacles that seem to limit us actually highlight what matters most. This bird's vibrant presence cuts through the grey like a beacon of hope.",
    hashtags: "#FoggyMorning #CardinalInFog #CardinalBird #MoodyNature #BirdPhotography #BackyardBirds #BirdWatching #AtmosphericPhoto #CardinalBeauty #WildlifePhotography #MistyMorning #CardinalFocus #NaturePhotography #BirdInFog #MoodyWildlife"
  },
  {
    caption: "A cardinal family moment—the male brings food while the female tends the nest. Cardinals typically raise 2-3 broods per season, with both parents feeding nestlings. This teamwork and dedication to family has made them symbols of domestic harmony and parental devotion.",
    hashtags: "#CardinalFamily #BirdParenting #CardinalNestlings #BirdWatching #CardinalBird #FamilyBirds #BackyardBirds #ParentBirds #CardinalBabies #WildlifePhotography #BirdFamilies #NaturePhotography #CardinalChicks #BirdingLife #WildlifeFamily"
  },
  {
    caption: "Ice coats the branches, but this cardinal's internal furnace keeps him warm. Birds have higher body temperatures than mammals—around 105°F—and remarkably efficient metabolisms. What looks like a delicate creature is actually a finely-tuned survival machine adapted for extremes.",
    hashtags: "#IceStorm #CardinalInIce #WinterBirds #CardinalBird #ExtremeWeather #BirdWatching #BackyardBirds #WinterWildlife #CardinalSurvival #IcyBirds #WildlifePhotography #NaturePhotography #WinterStorm #CardinalResilience #ColdWeatherBirds"
  },
  {
    caption: "This cardinal's perfect red plumage indicates peak health and genetic fitness. In the competitive world of bird romance, appearance matters. Females choose the reddest, most robust males as mates, ensuring their offspring inherit the best genes. Evolution has made beauty a practical tool for survival.",
    hashtags: "#CardinalMale #BirdMating #CardinalPlumage #BirdWatching #CardinalBird #MatingDisplay #BackyardBirds #BirdBeauty #CardinalRed #WildlifePhotography #NaturePhotography #BirdSelection #CardinalHealth #Ornithology #EvolutionaryBiology"
  },
  {
    caption: "Sunset silhouettes this cardinal against a painted sky. As day ends, cardinals seek secure roosting spots in dense vegetation. Throughout history, their appearance at twilight has been imbued with spiritual meaning—messengers between day and night, earth and heaven, the living and departed.",
    hashtags: "#SunsetBird #CardinalSilhouette #TwilightWildlife #CardinalBird #BirdWatching #EveningSky #BackyardBirds #SunsetPhotography #CardinalSunset #WildlifePhotography #SpiritualBirds #DuskBirds #NaturePhotography #CardinalMeaning #TwilightBirds"
  },
  {
    caption: "A cardinal finds shelter under pine boughs during a winter storm. Evergreens provide crucial protection for birds during harsh weather. Creating a bird-friendly yard means thinking about more than just feeders—dense shrubs and evergreen trees offer the safe havens that help wildlife thrive year-round.",
    hashtags: "#WinterShelter #CardinalProtection #CardinalBird #BirdHabitat #WildlifeFriendly #BackyardBirds #BirdWatching #WinterHabitat #CardinalWinter #WildlifeGardening #NativeGardening #BirdSafety #CardinalHome #WildlifePhotography #NaturePhotography"
  },
  {
    caption: "This female cardinal's keen eyes miss nothing. Birds have superior vision compared to humans, seeing more colors including ultraviolet light. What we perceive as 'subtle' brown plumage may actually shimmer with patterns invisible to us—a reminder that reality contains more beauty than we can perceive.",
    hashtags: "#BirdVision #FemaleCardinal #CardinalBird #BirdEyes #BirdWatching #BackyardBirds #CardinalFemale #WildlifeScience #BirdBiology #AnimalVision #WildlifePhotography #NaturePhotography #CardinalFeatures #BirdFacts #NatureScience"
  },
  {
    caption: "Spring nesting season finds this male cardinal singing his heart out. Males sing from high, exposed perches to attract mates and warn rivals. His song says 'I'm strong, I'm healthy, and I've claimed excellent territory.' In the bird world, a good voice matters as much as good looks!",
    hashtags: "#SpringSong #CardinalSinging #MaleCardinal #CardinalBird #BirdSong #BirdWatching #BackyardBirds #SpringBirds #MatingCall #CardinalMale #WildlifePhotography #NaturePhotography #BirdingSpring #TerritorySong #NatureMusic"
  },
  {
    caption: "Dappled light creates a natural spotlight on this cardinal. In forest understory—their original habitat—this red plumage helped cardinals stand out in patchy sunlight. Suburban gardens with mixed sun and shade perfectly replicate these conditions, explaining why cardinals thrive in our neighborhoods.",
    hashtags: "#DappleLight #CardinalHabitat #CardinalBird #ForestBirds #BirdWatching #BackyardBirds #NaturalLight #CardinalEnvironment #WildlifePhotography #NaturePhotography #SuburbanWildlife #CardinalHome #BirdHabitat #BirdingDaily #CardinalAdaptation"
  },
  {
    caption: "A cardinal preens methodically, maintaining feathers with the care of a master craftsman. Each feather must be properly aligned and oiled for optimal flight and insulation. This daily ritual takes hours but determines survival. Sometimes the most important work is the maintenance we do when no one's watching.",
    hashtags: "#BirdPreening #CardinalGrooming #CardinalBird #BirdMaintenance #BirdWatching #BackyardBirds #FeatherCare #CardinalBehavior #WildlifePhotography #BirdCare #NaturePhotography #CardinalDaily #BirdingLife #AnimalBehavior #WildlifeRituals"
  },
  {
    caption: "This cardinal pair coordinates their movements with practiced ease. Mated cardinals maintain contact through soft 'chip' calls, staying aware of each other's location even in dense vegetation. Their partnership involves constant communication—a lesson in the power of staying connected with those we love.",
    hashtags: "#CardinalPair #BirdCommunication #CardinalCouple #BirdWatching #CardinalBird #MatedPair #BackyardBirds #BirdBehavior #CardinalTogether #WildlifePhotography #BirdingDaily #NaturePhotography #CardinalBond #WildlifeCouples #BirdRelationships"
  },
  {
    caption: "Morning dew sparkles on leaves as this cardinal greets the day. Cardinals are among the first birds active in morning, their songs building from tentative chips to full-throated declarations as light grows. This daily ritual has marked the boundary between night and day for millions of years.",
    hashtags: "#MorningDew #DawnCardinal #CardinalBird #MorningRitual #BirdWatching #BackyardBirds #DawnChorus #CardinalMorning #WildlifePhotography #MorningBirds #NaturePhotography #BirdSong #DayBreak #CardinalDaily #NatureMorning"
  },
  {
    caption: "This cardinal's crop—a throat pouch for storing food—bulges with seeds. He'll carry these back to his mate or nestlings, or save them for later. This biological food storage system lets cardinals feed quickly at exposed feeders then retreat to cover to digest safely.",
    hashtags: "#CardinalFeeding #BirdAnatomy #CardinalBird #BirdBiology #BirdWatching #BackyardBirds #CardinalBehavior #WildlifeScience #BirdFacts #CardinalFeatures #NaturePhotography #WildlifePhotography #BirdFeeder #CardinalDiet #OrnithologyFacts"
  },
  {
    caption: "A juvenile female cardinal emerges into independence. Young females are often overlooked, but they're the future of cardinal populations. Conservation starts with appreciating every individual—not just the brightest or most obvious—and ensuring habitat exists for all to thrive.",
    hashtags: "#YoungCardinal #FemaleCardinal #CardinalJuvenile #BirdWatching #CardinalBird #BackyardBirds #WildlifeConservation #BirdConservation #YoungBirds #CardinalFuture #WildlifePhotography #NaturePhotography #CardinalDevelopment #ConservationMatters #BirdingLife"
  },
  {
    caption: "Storm clouds gather, but this cardinal holds his ground. There's something inspiring about a small bird standing firm against an ominous sky. Cardinals' year-round residency means facing whatever weather comes, and they do it with remarkable courage and resilience.",
    hashtags: "#StormySkies #CardinalCourage #CardinalBird #WeatherBirds #BirdWatching #BackyardBirds #StormWeather #CardinalResilience #WildlifePhotography #DramaticSky #NaturePhotography #BirdingDaily #CardinalStrong #WildlifeResilience #NatureMoods"
  },
  {
    caption: "This male cardinal feeds his mate in a tender beak-to-beak exchange. This 'courtship feeding' strengthens pair bonds and provides females with extra nutrition for egg production. It's one of nature's most touching displays—proof that even in the wild, caring for each other matters.",
    hashtags: "#CourtshipFeeding #CardinalCourtship #CardinalLove #BirdWatching #CardinalBird #BirdRomance #BackyardBirds #MatingBehavior #CardinalPair #WildlifePhotography #BirdingDaily #NaturePhotography #CardinalCouple #WildlifeRomance #BirdBehavior"
  },
  {
    caption: "Autumn's palette provides the perfect backdrop for this cardinal's crimson glow. As leaves change and fall, cardinals remain—constants in an ever-shifting world. Their year-round presence makes them reliable friends, familiar faces we can count on no matter the season.",
    hashtags: "#AutumnCardinal #FallColors #CardinalBird #AutumnBirds #BirdWatching #BackyardBirds #FallWildlife #SeasonalBirds #CardinalAutumn #WildlifePhotography #FallPhotography #NaturePhotography #CardinalBeauty #AutumnNature #BirdingFall"
  },
  {
    caption: "This cardinal discovers a natural water source. While feeders attract birds, water is equally important. A simple birdbath or small pond transforms your yard into an oasis. Clean water for drinking and bathing is often scarcer than food—providing it makes you a true wildlife steward.",
    hashtags: "#BirdWater #CardinalDrinking #WaterForWildlife #CardinalBird #BackyardBirds #BirdWatching #WildlifeFriendly #BirdBath #WaterSource #CardinalCare #WildlifeGardening #NaturePhotography #WildlifePhotography #BirdingTips #BackyardHabitat"
  },
  {
    caption: "A cardinal fledgling makes its first solo flight. That leap from nest to branch takes courage—there's no practice run, no safety net. Yet instinct and weeks of watching parents combine to create this moment of transformation. Sometimes we're more ready than we think we are.",
    hashtags: "#FirstFlight #CardinalFledgling #BabyBird #CardinalBird #BirdWatching #BackyardBirds #FledglingBird #BirdDevelopment #CardinalBaby #WildlifePhotography #NaturePhotography #CardinalYouth #BirdGrowth #WildlifeMoments #BirdingLife"
  },
  {
    caption: "Winter twilight turns the world blue, but this cardinal remains a defiant spot of warm red. As temperatures drop, their significance as symbols of hope and perseverance only grows stronger. In nature's harshest moments, some souls shine brightest—small reminders that warmth exists even in the cold.",
    hashtags: "#WinterTwilight #CardinalHope #CardinalBird #WinterEvening #BirdWatching #BackyardBirds #TwilightBirds #WinterSymbol #CardinalWinter #WildlifePhotography #BlueHour #NaturePhotography #CardinalBeauty #WinterNature #BirdingWinter"
  },
  {
    caption: "This female cardinal tends her nest with focused dedication. She'll incubate 2-5 eggs for about two weeks, leaving only briefly for food her mate brings. This unwavering commitment ensures the next generation's survival. Success in nature, as in life, often comes down to showing up consistently.",
    hashtags: "#NestingCardinal #CardinalMother #BirdNesting #CardinalBird #BirdWatching #BackyardBirds #MotherBird #CardinalNest #BirdParenting #WildlifePhotography #NaturePhotography #CardinalFamily #BirdDedication #WildlifeMoms #NestingBirds"
  },
  {
    caption: "A cardinal claims his favorite singing perch at first light. Territory establishment begins before dawn, with songs that announce 'This space is mine.' While we sleep, cardinals are already at work, defending the resources that will sustain their families through the year ahead.",
    hashtags: "#CardinalTerritory #DawnSong #CardinalBird #MorningSinger #BirdWatching #BackyardBirds #TerritorialBird #CardinalSong #WildlifePhotography #BirdingDaily #EarlyMorning #NaturePhotography #CardinalBehavior #BirdTerritory #DawnChorus"
  }
];

function generateCardinalSVG(index: number): string {
  const designs = [
    // Design 1: Classic perched cardinal
    (idx: number) => `<svg width="800" height="600" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="sky${idx}" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" style="stop-color:#87CEEB;stop-opacity:1" />
          <stop offset="100%" style="stop-color:#E0F6FF;stop-opacity:1" />
        </linearGradient>
        <radialGradient id="sun${idx}">
          <stop offset="0%" style="stop-color:#FFF4E0;stop-opacity:1" />
          <stop offset="100%" style="stop-color:#FFD700;stop-opacity:0.8" />
        </radialGradient>
      </defs>
      <rect width="800" height="600" fill="url(#sky${idx})"/>
      <circle cx="650" cy="100" r="60" fill="url(#sun${idx})"/>
      <ellipse cx="400" cy="550" rx="350" ry="40" fill="#8B7355" opacity="0.3"/>
      <rect x="350" y="300" width="30" height="250" fill="#654321"/>
      <rect x="360" y="280" width="10" height="30" fill="#8B6F47"/>
      <ellipse cx="365" cy="270" rx="35" ry="15" fill="#228B22"/>
      <path d="M 365 220 Q 340 235 330 260 Q 325 270 340 275 L 365 270 Z" fill="#DC143C"/>
      <ellipse cx="365" cy="235" rx="40" ry="38" fill="#DC143C"/>
      <circle cx="355" cy="228" r="4" fill="#000"/>
      <path d="M 348 232 L 340 233 L 342 235 Z" fill="#FF6347"/>
      <path d="M 365 250 L 365 260" stroke="#DC143C" stroke-width="2"/>
      <path d="M 375 255 Q 420 250 440 265" stroke="#8B0000" stroke-width="3" fill="none"/>
      <path d="M 355 255 Q 310 260 290 275" stroke="#8B0000" stroke-width="3" fill="none"/>
      <ellipse cx="370" cy="215" rx="8" ry="18" fill="#8B0000"/>
    </svg>`,

    // Design 2: Female cardinal
    (idx: number) => `<svg width="800" height="600" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="bg${idx}" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style="stop-color:#FFF8DC;stop-opacity:1" />
          <stop offset="100%" style="stop-color:#F0E68C;stop-opacity:1" />
        </linearGradient>
      </defs>
      <rect width="800" height="600" fill="url(#bg${idx})"/>
      <rect x="100" y="400" width="600" height="150" fill="#8B7355" opacity="0.4"/>
      <rect x="380" y="320" width="35" height="200" fill="#654321"/>
      <path d="M 400 240 Q 375 255 365 280 Q 360 290 375 295 L 400 290 Z" fill="#CD853F"/>
      <ellipse cx="400" cy="255" rx="42" ry="40" fill="#D2B48C"/>
      <circle cx="390" cy="248" r="4" fill="#000"/>
      <path d="M 383 252 L 375 253 L 377 255 Z" fill="#DAA520"/>
      <path d="M 410 265 Q 455 260 475 275" stroke="#A0522D" stroke-width="3" fill="none"/>
      <path d="M 390 265 Q 345 270 325 285" stroke="#A0522D" stroke-width="3" fill="none"/>
      <ellipse cx="405" cy="235" rx="8" ry="18" fill="#B8860B"/>
      <path d="M 420 250 L 430 248 L 428 255 Z" fill="#DC143C" opacity="0.6"/>
    </svg>`,
  ];

  const designFunc = designs[index % designs.length];
  return designFunc(index);
}

export async function POST() {
  const encoder = new TextEncoder();

  const stream = new ReadableStream({
    async start(controller) {
      try {
        const zip = new JSZip();

        // Generate 50 images and captions
        for (let i = 0; i < 50; i++) {
          // Generate SVG image
          const svg = generateCardinalSVG(i);
          zip.file(`cardinal_${i + 1}.svg`, svg);

          // Generate caption file
          const captionData = captions[i];
          const captionText = `${captionData.caption}\n\n${captionData.hashtags}`;
          zip.file(`caption_${i + 1}.txt`, captionText);

          // Send progress update
          const progress = Math.round(((i + 1) / 50) * 100);
          controller.enqueue(
            encoder.encode(`data: ${JSON.stringify({ progress })}\n\n`)
          );
        }

        // Generate zip file
        const zipBlob = await zip.generateAsync({ type: 'blob' });
        const buffer = await zipBlob.arrayBuffer();
        const base64 = Buffer.from(buffer).toString('base64');
        const downloadUrl = `data:application/zip;base64,${base64}`;

        // Send completion message
        controller.enqueue(
          encoder.encode(`data: ${JSON.stringify({ progress: 100, downloadUrl })}\n\n`)
        );

        controller.close();
      } catch (error) {
        console.error('Error generating package:', error);
        controller.error(error);
      }
    },
  });

  return new Response(stream, {
    headers: {
      'Content-Type': 'text/event-stream',
      'Cache-Control': 'no-cache',
      'Connection': 'keep-alive',
    },
  });
}
