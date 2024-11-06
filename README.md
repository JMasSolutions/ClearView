<img width="90" height="90" alt="icon" src="https://github.com/user-attachments/assets/8524aaac-2c08-46b3-8d77-2b3f817a98fb"> 

# ClearView

**Overview**

ClearView is a Chrome extension that provides insights into the political bias and credibility of news sources. By displaying AllSides data for the website a user is currently viewing, ClearView helps users make informed judgments about the news they consume.

ClearView retrieves the site’s bias rating, confidence level, and agreement statistics directly from AllSides, displaying this information in a structured, easy-to-read popup.

**Features**

 • Political Bias Ratings: See where news sources stand on the political spectrum (e.g., left-center, right).
 • Confidence Level: Understand the reliability of each rating based on AllSides’ confidence metrics.
 • Engagement Metrics: View metrics such as agree/disagree counts and the percentage of users who agree with the rating.
 • AllSides Profile Links: Access additional details about the news source directly on AllSides’ website.

**How It Works**

ClearView uses the og:site_name meta property to identify the current website and fetches data from AllSides to display relevant bias and reliability information. If the og:site_name is unavailable, it falls back to the website hostname.

**Setup**

***Prerequisites***

 • Any Chromium-based browser (e.g., Chrome, Opera, Edge) with Developer Mode enabled

***Installation***

For Google Chrome, Opera, Edge, or Other Chromium Browsers:

 1. Download the source code from the latest release: https://github.com/JMasSolutions/ClearView 

 2. Load the Extension in Your Browser
    • Open your Chromium-based browser and go to the extensions page:
    • Chrome/Edge: chrome://extensions/
    • Opera: opera://extensions/
    • Enable Developer Mode (usually found in the top right corner).
    • Click Load unpacked and select the ClearView project folder.
    • The ClearView icon should now appear in your browser’s toolbar.

 3. Test the Extension
    • Navigate to a news website, then click the ClearView icon in the toolbar.
    • The extension will display AllSides data related to the site.

**Permissions**

ClearView requests the following permissions:

 • activeTab: Allows the extension to access the currently active tab for extracting site information.
 • scripting: Enables the extension to execute content scripts dynamically.

**License**

This project is licensed under the MIT License.

