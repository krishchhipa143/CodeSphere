import React from "react";
import HeroSection from "../Components/HomePageElements/HeroSection";
import QuickStart from "../Components/HomePageElements/QuickStart";
import DailyTasks from "../Components/HomePageElements/DailyTasks";
import RecentProjects from "../Components/HomePageElements/RecentProjects";
import RankBadgeSummary from "../Components/HomePageElements/RankBadgeSummary";
import LeaderboardPreview from "../Components/HomePageElements/LeaderboardPreview";
import RecentActivity from "../Components/HomePageElements/RecentActivity";
import HelpRequest from "../Components/HomePageElements/HelpRequest";

const HomePage = () => {
  const wrapper = {
    height : "100%",
    padding: "2rem",
    backgroundColor: "var(--bg-color)",
  };

  const grid = {
    display: "grid",
    gap: "1.5rem",
    gridTemplateColumns: "repeat(12, 1fr)", // 12-column layout
    gridAutoRows: "minmax(150px, auto)",
  };

  const item = (colSpan) => ({
    gridColumn: `span ${colSpan}`,
    backgroundColor: "var(--card-bg)",
    borderRadius: "16px",
    padding: "1.2rem",
    border: "1px solid var(--border-color)",
    boxShadow: "var(--shadow)",
  });

  return (
    <>
      <HeroSection />
      <div style={wrapper}>
        <div style={grid}>
          {/* Row 1 */}
          <div style={item(4)}>
            <QuickStart />
          </div>
          <div style={item(8)}>
            <DailyTasks />
          </div>

          {/* Row 2 */}
          <div style={item(6)}>
            <RecentProjects />
          </div>
          <div style={item(3)}>
            <RankBadgeSummary />
          </div>
          <div style={item(3)}>
            <LeaderboardPreview />
          </div>

          {/* Row 3 */}
          <div style={item(6)}>
            <RecentActivity />
          </div>
          <div style={item(6)}>
            <HelpRequest />
          </div>
        </div>
      </div>
    </>
  );
};

export default HomePage;
