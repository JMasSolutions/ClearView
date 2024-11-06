// To Extract The Site Name To Then Compare It From Our Data Source
(() => {
    const metaTag = document.querySelector('meta[property="og:site_name"]');
    return metaTag ? metaTag.getAttribute("content") : "Unknown Site";
  })();