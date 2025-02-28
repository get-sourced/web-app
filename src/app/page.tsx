import { jetBrains_font, karla_font } from "@/assets/fonts";
import HightLightText from "@/components/highlightText";
import MapComponents from "@/components/mapComponents";
import { whatWeOffer } from "@/utils/whatWeOffer";

export default function Home() {
  return (
    <>
      <section className="flex w-full  max-w-[780px] gap-5 justify-center flex-col h-full] px-4 mt-auto items-center">
        {" "}
        <h2 className="text-center">
          No more endless searching—just seamless connections to projects that
          help you grow. Whether you{"'"}re looking to contribute or seeking
          collaborators for your own project,
          <HightLightText> Get Sourced </HightLightText>
          makes it effortless.
        </h2>
        <p className={`${karla_font.className} md:text-lg text-center`}>
          With <HightLightText> Get Sourced </HightLightText>
          discovering <HightLightText>open-source projects</HightLightText> that
          match your skill set has never been easier.
        </p>
        <h1
          className={`md:text-8xl text-center text-3xl text-lighterBlack font-bold ${jetBrains_font.className}`}
        >
          Welcome to <HightLightText>Get Sourced.</HightLightText>
        </h1>
        <p className="text-sm md:text-base text-center">
          We know that open source is more than just code; it’s about sharpening
          your skills, building your portfolio, and boosting your career. That’s
          why we created this tool—to help you find the right opportunities and
          the right people, all in one place.
        </p>
      </section>
      <section className="flex flex-col gap-6 w-full px-4">
        <h3 className="text-center md:text-3xl font-extrabold">
          What you get out of the box with{" "}
          <HightLightText className="!font-extrabold">
            Get Sourced.
          </HightLightText>
        </h3>

        <MapComponents
          className="w-full flex gap-6 flex-wrap items-center justify-center"
          items_to_map={whatWeOffer}
          method={(item) => {
            return (
              <article
                key={item.header}
                className="flex flex-col gap-2 max-w-[390px]  w-full flex-shrink-0 "
              >
                <h4
                  className={`md:text-lg font-bold ${jetBrains_font.className}`}
                >
                  {item.header}
                </h4>
                <p className={`${karla_font.className} text-sm md:text-base`}>
                  {item.body}
                </p>
              </article>
            );
          }}
        />
      </section>
    </>
  );
}
