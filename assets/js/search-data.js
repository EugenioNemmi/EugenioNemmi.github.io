// get the ninja-keys element
const ninja = document.querySelector('ninja-keys');

// add the home and posts menu items
ninja.data = [{
    id: "nav-about",
    title: "about",
    section: "Navigation",
    handler: () => {
      window.location.href = "/";
    },
  },{id: "nav-eugenio-nerio-nemmi",
          title: "Eugenio Nerio Nemmi",
          description: "Assistant Professor of Computer Science, Sapienza University of Rome",
          section: "Navigation",
          handler: () => {
            window.location.href = "/bio/";
          },
        },{id: "nav-publications",
          title: "publications",
          description: "Peer-reviewed papers and preprints, newest first.",
          section: "Navigation",
          handler: () => {
            window.location.href = "/publications/";
          },
        },{id: "nav-cv",
          title: "CV",
          description: "Also available as a PDF.",
          section: "Navigation",
          handler: () => {
            window.location.href = "/cv/";
          },
        },{id: "nav-teaching",
          title: "teaching",
          description: "Courses I teach and have taught.",
          section: "Navigation",
          handler: () => {
            window.location.href = "/teaching/";
          },
        },{id: "nav-service",
          title: "service",
          description: "Workshops, program committees, reviewing and university roles.",
          section: "Navigation",
          handler: () => {
            window.location.href = "/service/";
          },
        },{id: "news-started-as-assistant-professor-rtd-a-in-the-department-of-computer-science-at-sapienza",
          title: 'Started as Assistant Professor (RTD-A) in the Department of Computer Science at Sapienza....',
          description: "",
          section: "News",},{id: "news-visiting-the-center-for-secure-information-systems-at-nyu-this-month-hosted-by-damon-mccoy-to-work-on-arbitrage-on-centralized-exchanges",
          title: 'Visiting the Center for Secure Information Systems at NYU this month, hosted by...',
          description: "",
          section: "News",},{id: "news-in-wuhan-china-until-20-may-teaching-algorithms-for-the-sapienza-zuel-joint-degree-in-applied-computer-science-and-artificial-intelligence",
          title: 'In Wuhan, China, until 20 May, teaching Algorithms for the Sapienza–ZUEL joint degree...',
          description: "",
          section: "News",},{id: "news-new-preprint-with-nyu-a-truckload-of-satoshis-detecting-and-measuring-one-way-arbitrage-in-the-wild",
          title: 'New preprint with NYU: A Truckload of Satoshis: Detecting and Measuring One-Way Arbitrage...',
          description: "",
          section: "News",},{id: "news-two-papers-at-esorics-2026-one-on-verifiable-decision-support-and-one-on-participation-concentration-in-community-notes-i-am-also-general-chair-of-the-humsec-26-workshop-on-human-targeted-cyber-threats-and-defenses",
          title: 'Two papers at ESORICS 2026, one on verifiable decision support and one on...',
          description: "",
          section: "News",},{id: "news-a-truckload-of-satoshis-our-paper-with-nyu-on-one-way-arbitrage-was-accepted-at-financial-cryptography-and-data-security-fc-2027",
          title: 'A Truckload of Satoshis, our paper with NYU on one-way arbitrage, was accepted...',
          description: "",
          section: "News",},{id: "projects-blockchain-fraud",
          title: 'Blockchain fraud',
          description: "NFT wash trading, token scams, and confidential data exchange on public blockchains",
          section: "Projects",handler: () => {
              window.location.href = "/projects/1_blockchain/";
            },},{id: "projects-arbitrage-on-centralized-exchanges",
          title: 'Arbitrage on centralized exchanges',
          description: "Detecting and measuring one-way arbitrage in the wild, with NYU",
          section: "Projects",handler: () => {
              window.location.href = "/projects/2_finance/";
            },},{id: "projects-privacy-preserving-systems",
          title: 'Privacy-preserving systems',
          description: "Confidential, verifiable decision support and email tracking",
          section: "Projects",handler: () => {
              window.location.href = "/projects/3_privacy/";
            },},{id: "projects-platform-integrity",
          title: 'Platform integrity',
          description: "Manipulation of community fact-checking and social bots",
          section: "Projects",handler: () => {
              window.location.href = "/projects/4_integrity/";
            },},{id: "projects-dark-web-profiling",
          title: 'Dark Web profiling',
          description: "Linking Dark Web aliases to real Internet identities",
          section: "Projects",handler: () => {
              window.location.href = "/projects/5_darkweb/";
            },},{id: "projects-internet-measurement",
          title: 'Internet measurement',
          description: "Detecting BGP hijacks and misconfigurations, with UCSD and MIT",
          section: "Projects",handler: () => {
              window.location.href = "/projects/6_bgp/";
            },},{id: "projects-ai-for-the-primary-sector",
          title: 'AI for the primary sector',
          description: "Generative AI for agriculture, aquaculture, and marine monitoring",
          section: "Projects",handler: () => {
              window.location.href = "/projects/7_agriculture/";
            },},{id: "projects-smart-peephole",
          title: 'Smart Peephole',
          description: "Biometric home-access security on the cloud",
          section: "Projects",handler: () => {
              window.location.href = "/projects/8_peephole/";
            },},{id: "teachings-algorithms",
          title: 'Algorithms',
          description: "Algorithm design and problem solving, for the Applied Computer Science and Artificial Intelligence (ACSAI) joint degree of Sapienza University of Rome and Zhongnan University of Economics and Law (ZUEL).",
          section: "Teachings",handler: () => {
              window.location.href = "/teachings/algorithms-zuel-2026/";
            },},{id: "teachings-informatica-generale",
          title: 'Informatica Generale',
          description: "Implementing algorithms and solving problems, ending with a tournament between Hex players written by the students.",
          section: "Teachings",handler: () => {
              window.location.href = "/teachings/informatica-generale-2024/";
            },},{id: "teachings-introduction-to-programming-and-laboratory",
          title: 'Introduction to Programming and Laboratory',
          description: "Introductory programming with lab sessions, for the BSc in Molecular Biology, Medicinal Chemistry and Computer Science for Pharmaceutical Applications.",
          section: "Teachings",handler: () => {
              window.location.href = "/teachings/intro-programming-2025/";
            },},{id: "teachings-introduction-to-programming-and-laboratory",
          title: 'Introduction to Programming and Laboratory',
          description: "Introductory programming with lab sessions, for the BSc in Molecular Biology, Medicinal Chemistry and Computer Science for Pharmaceutical Applications.",
          section: "Teachings",handler: () => {
              window.location.href = "/teachings/intro-programming-2026/";
            },},{id: "teachings-introduction-to-programming-and-laboratory",
          title: 'Introduction to Programming and Laboratory',
          description: "Introductory programming with lab sessions, for the BSc in Molecular Biology, Medicinal Chemistry and Computer Science for Pharmaceutical Applications.",
          section: "Teachings",handler: () => {
              window.location.href = "/teachings/intro-programming-2027/";
            },},{
        id: 'social-email',
        title: 'email',
        section: 'Socials',
        handler: () => {
          window.open("mailto:%6E%65%6D%6D%69@%64%69.%75%6E%69%72%6F%6D%61%31.%69%74", "_blank");
        },
      },{
        id: 'social-cv',
        title: 'CV',
        section: 'Socials',
        handler: () => {
          window.open("/assets/rendercv/rendercv_output/Eugenio_Nerio_Nemmi_CV.pdf", "_blank");
        },
      },{
        id: 'social-github',
        title: 'GitHub',
        section: 'Socials',
        handler: () => {
          window.open("https://github.com/EugenioNemmi", "_blank");
        },
      },{
        id: 'social-scholar',
        title: 'Google Scholar',
        section: 'Socials',
        handler: () => {
          window.open("https://scholar.google.com/citations?user=1WVOUMQAAAAJ", "_blank");
        },
      },{
      id: 'light-theme',
      title: 'Change theme to light',
      description: 'Change the theme of the site to Light',
      section: 'Theme',
      handler: () => {
        setThemeSetting("light");
      },
    },
    {
      id: 'dark-theme',
      title: 'Change theme to dark',
      description: 'Change the theme of the site to Dark',
      section: 'Theme',
      handler: () => {
        setThemeSetting("dark");
      },
    },
    {
      id: 'system-theme',
      title: 'Use system default theme',
      description: 'Change the theme of the site to System Default',
      section: 'Theme',
      handler: () => {
        setThemeSetting("system");
      },
    },];
