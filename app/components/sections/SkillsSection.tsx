import { getSkills } from "@/app/lib/skills";
import { Stagger, StaggerItem, CountUp, Rise } from "../utils/motion";

const SkillsSection = () => {
  const skillGroups = getSkills();

  return (
    <div className="grid gap-x-12 gap-y-9 lg:grid-cols-[minmax(0,11rem)_1fr]">
      <Rise scroll>
        <div>
          <p className="eyebrow">
            <span className="text-[var(--accent)]">
              <CountUp to={3} />
            </span>{" "}
            / 04
          </p>
          <h2 className="section-title mt-4">Skills</h2>
          <p className="mt-5 max-w-[26ch] text-sm leading-6 text-[var(--muted)]">
            Tools I reach for when building things — from apps to
            infrastructure.
          </p>
        </div>
      </Rise>

      <Stagger as="dl" gap={0.04}>
        {skillGroups.map((group) => (
          <StaggerItem
            key={group.label}
            as="div"
            className="grid gap-2 border-b border-[var(--border)] py-4 sm:grid-cols-[minmax(0,9rem)_1fr] sm:gap-6"
          >
            <dt className="eyebrow pt-0.5">{group.label}</dt>
            <dd className="flex flex-wrap gap-x-6 gap-y-2">
              {group.items.map((item) => (
                <span
                  key={item}
                  className="text-sm leading-6 text-[var(--soft)]"
                >
                  {item}
                </span>
              ))}
            </dd>
          </StaggerItem>
        ))}
      </Stagger>
    </div>
  );
};

export default SkillsSection;
