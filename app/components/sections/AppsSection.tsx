import ScrollSection from '../utils/ScrollSection';
import IPhone from '../utils/iPhone';

const AppsSection = () => {
  return (
    <ScrollSection>
      <h2 className="text-3xl font-bold text-center mb-8">My Apps</h2>
      <div className="flex justify-center">
        <IPhone />
      </div>
    </ScrollSection>
  );
};

export default AppsSection;
