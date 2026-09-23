import { About } from "@/components/about";
import { Contact } from "@/components/contact";
import { Experience } from "@/components/experience";
import { GithubActivity } from "@/components/github-activity";
import { Hero } from "@/components/hero";
import { Projects } from "@/components/projects";
import { Services } from "@/components/services";
import { Skills } from "@/components/skills";
import {
  getEducation,
  getExperience,
  getMarqueeStack,
  getProfile,
  getProjectFilters,
  getProjects,
  getServices,
  getSkillGroups,
  getStats,
} from "@/lib/content";
import { getGithubSummary } from "@/lib/github";

/** ঘণ্টায় একবার পেজটা রিজেনারেট হবে (ISR) — GitHub ডেটাও তখন রিফ্রেশ হয়। */
export const revalidate = 3600;

export default async function Home() {
  const [
    profile,
    stats,
    education,
    services,
    skillGroups,
    marqueeStack,
    experience,
    projects,
    projectFilters,
    github,
  ] = await Promise.all([
    getProfile(),
    getStats(),
    getEducation(),
    getServices(),
    getSkillGroups(),
    getMarqueeStack(),
    getExperience(),
    getProjects(),
    getProjectFilters(),
    getGithubSummary(),
  ]);

  return (
    <main>
      <Hero profile={profile} stack={marqueeStack} />
      <About profile={profile} stats={stats} education={education} />
      <Services services={services} />
      <Skills skillGroups={skillGroups} />
      <Experience experience={experience} education={education} />
      <Projects initialProjects={projects} filters={projectFilters} />
      <GithubActivity data={github} />
      <Contact profile={profile} />
    </main>
  );
}
