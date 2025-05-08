import { Button } from '@/components/ui/button';
import { RiddleArray } from '../../../data/riddle';
import { riddleContent } from '@/data/riddleContent';
import { getRiddleTotalKeyword, slugify, toTitleCase } from '@/utils/func';
import { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import ClickToCopy from './components/clicktoCopy';
import EngagementFeatures from '@/components/EngagementFeatures';
import ChallengeMode from '@/components/ChallengeMode';
import InteractiveCategoryExplorer from '@/components/InteractiveCategoryExplorer';

type Props = {
  params: {
    slug: string;
  };
};

// Generate metadata for each dynamic route
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const resolvedParams = await params;
  const paramSlug = resolvedParams.slug;
  
  const requestedRiddle = getRiddleTotalKeyword().find((item) => slugify(item) === paramSlug);
  
  if(!requestedRiddle){
    return {
        title: `404: This Page Could Not be Found | AI Riddle Generator`,
      };
  }


  const metaDescription = riddleContent[slugify(requestedRiddle)]?.metaDescription ||  "Challenge your mind with these brain-teasing riddles";

  const matchingArray = RiddleArray.filter((item) => item.keyword === slugify(requestedRiddle));

  const capitalizedTitle = riddleContent[slugify(requestedRiddle)]?.title || toTitleCase(requestedRiddle) + "That Gets Everyone";
  
  return {
    title: `(${matchingArray.length}+) ${capitalizedTitle} | AI Riddle Generator`,
    description: metaDescription,
    openGraph: {
      title: `${matchingArray.length}+ ${capitalizedTitle} Riddles and Brain Teasers | AI Riddle Generator`,
      description: metaDescription,
      type: 'website',
      url: `${process.env.NEXT_PUBLIC_BASE_URL}/${paramSlug}`,
    },
    twitter: {
      card: 'summary_large_image',
      title: `${matchingArray.length}+ ${capitalizedTitle} Riddles`,
      description: metaDescription,
    },
    alternates: {
      canonical: `${process.env.NEXT_PUBLIC_BASE_URL}/${paramSlug}`,
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
      },
    },
  };
}

export async function generateStaticParams() {
  return getRiddleTotalKeyword().map((category) => ({
    slug: slugify(category)
  }));
}

const Page = async ({ params }: Props) => {
  const resolvedParams = await params;
  const paramSlug = resolvedParams.slug;
  const requestedRiddle = getRiddleTotalKeyword().find((item) => slugify(item) === paramSlug);
  
  if(!requestedRiddle){
    notFound();
  }


  const heroText = riddleContent[slugify(requestedRiddle)]?.heroText || "Challenge your mind with these brain-teasing riddles";

  const capitalizedTitle = riddleContent[slugify(requestedRiddle)]?.title || toTitleCase(requestedRiddle) + " Riddle That Gets Everyone";

  
  const matchingArray = RiddleArray.filter((item) => item.keyword === slugify(requestedRiddle));
  

  return (
    <section className='space-y-16'>
      <div className='flex flex-col items-center gap-4 sm:flex-row'>
        <div className='w-48 h-48 bg-slate-500 min-w-48'>
          {/* Image placeholder */}
        </div>
        <div className='space-y-4 flex flex-col items-stretch'>
          <h1 className="text-3xl font-bold mb text-[#1C3144]">
            {`(${matchingArray.length}+) ${capitalizedTitle}`} 
          </h1>
          <p className='text-xs text-[#163300]'>{heroText}</p>
          <Button 
            asChild
            className='shadow-[2px_2px_0_0_#163300] border-2 border-black text-xs text-[#163300] bg-[#FFC107] hover:bg-[#333333] focus:active:bg-[#333333] hover:text-white active:hover:text-white'
          >
            <Link href={'/riddles'} className='text-sm font-bold'>
              {`Generate More ${toTitleCase(requestedRiddle)} Riddles`.toUpperCase()}
            </Link> 
          </Button>
        </div>
      </div>
      <ChallengeMode />

      <div className="space-y-4 border-2 border-black rounded-[4px]">
        <ul>
          {matchingArray.map((riddle) => (
            <details className="bg-white shadow p-4 border-b border-black rounded-t-[4px] text-[#212529] details-content:mt-3 details-content:-ml-0.5" close>
              <summary className="text-sm leading-6 font-semibold text-gray-900 cursor-pointer select-none dark:text-[#212529] flex justify-between items-center">
                <div>{riddle.riddle}</div>
                <ClickToCopy content={riddle.riddle}/>
              </summary>
              <div className="transition-all duration-300 ease-in-out text-sm mt-3">
                {riddle.answer}
              </div>
            </details>
          ))}
        </ul>
      </div>
      <EngagementFeatures />
      <InteractiveCategoryExplorer />
    </section>
  );
};

export default Page;