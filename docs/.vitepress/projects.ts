import type { Project } from "@vaam-apps/vitepress-md3";

/**
 * Every public vaam-apps project the hub links to. Descriptions are the
 * repositories' own GitHub descriptions; keep them in sync from there rather
 * than rewording them here.
 */
export interface ProjectGroup {
  title: string;
  blurb: string;
  projects: Project[];
}

export const groups: ProjectGroup[] = [
  {
    title: "Platforms",
    blurb: "Services you run, integrate with, or build a product on.",
    projects: [
      {
        title: "vpay",
        description:
          "Provider-agnostic payment gateway for Central Africa with a Stripe-shaped API. MTN MoMo & Orange Money adapters, hosted checkout, webhooks, and Rust/Node SDKs.",
        link: "https://vpay-oss.vaam.store",
        repo: "vaam-apps/vpay",
        tags: ["Rust", "Payments"],
        shape: "cookie-9",
      },
      {
        title: "vsms",
        description:
          "A Cameroon-first, extensible A2P SMS gateway for OTPs and notifications: multi-provider HTTP/SMPP delivery, DLRs, signed webhooks.",
        link: "https://github.com/vaam-apps/vsms#readme",
        repo: "vaam-apps/vsms",
        tags: ["Rust", "SMS"],
        shape: "clover-4",
      },
      {
        title: "emgr",
        monogram: "e",
        description: "Image resizing service.",
        link: "https://emgr-oss.vaam.store",
        repo: "vaam-apps/image-resizer",
        tags: ["Rust", "Images"],
        shape: "sunny",
      },
    ],
  },
  {
    title: "Interfaces",
    blurb: "What our screens and our docs are built from.",
    projects: [
      {
        title: "@vaam-apps/ui",
        monogram: "ui",
        description:
          "A dark-first React component library for operator consoles — daisyUI styling, Headless UI behaviour, and a parameterised status-glyph system.",
        link: "https://ui-oss.vaam.store",
        repo: "vaam-apps/ui",
        tags: ["React", "Design system"],
        shape: "square",
      },
      {
        title: "vitepress-md3",
        monogram: "m3",
        description:
          "This site's theme: Material 3 for VitePress, Expressive or standard, generated from one seed colour.",
        link: "/guide/",
        repo: "vaam-apps/vitepress-md3",
        tags: ["VitePress", "Material 3"],
        shape: "flower",
      },
    ],
  },
  {
    title: "Libraries",
    blurb: "Small, sharp packages extracted from the platforms.",
    projects: [
      {
        title: "meta-whatsapp-rs",
        monogram: "wa",
        description:
          "WhatsApp Business Platform for Rust: typed Cloud API client, webhooks, Embedded Signup, templates, OTP, adapters, Typst documents.",
        link: "https://github.com/vaam-apps/meta-whatsapp-rs#readme",
        repo: "vaam-apps/meta-whatsapp-rs",
        tags: ["Rust"],
      },
      {
        title: "flutter-otel-zone",
        monogram: "fo",
        description:
          "One Talker, one OpenTelemetry SDK and one guarded zone for a Flutter app — with a severity floor for metered connections.",
        link: "https://github.com/vaam-apps/flutter-otel-zone#readme",
        repo: "vaam-apps/flutter-otel-zone",
        tags: ["Flutter", "OpenTelemetry"],
      },
      {
        title: "flutter-sign-keypair",
        monogram: "fk",
        description:
          "Hardware-backed ECDSA P-256 (ES256) signing for Flutter, via AndroidKeyStore / the Apple Secure Enclave.",
        link: "https://github.com/vaam-apps/flutter-sign-keypair#readme",
        repo: "vaam-apps/flutter-sign-keypair",
        tags: ["Flutter", "Security"],
      },
      {
        title: "tauri-sign-keypair",
        monogram: "tk",
        description:
          "Hardware-backed ES256 signing for device-bound authentication in Tauri v2 apps. Port of flutter-sign-keypair.",
        link: "https://github.com/vaam-apps/tauri-sign-keypair#readme",
        repo: "vaam-apps/tauri-sign-keypair",
        tags: ["Tauri", "Security"],
      },
      {
        title: "tauri-webview-guard",
        monogram: "tg",
        description:
          "Refuse to boot a Tauri v2 app into a below-floor WebView engine, and say how to fix it — natively, before first paint.",
        link: "https://github.com/vaam-apps/tauri-webview-guard#readme",
        repo: "vaam-apps/tauri-webview-guard",
        tags: ["Tauri"],
      },
    ],
  },
  {
    title: "Agent skills",
    blurb: "Installable with npx skills add, each versioned against the commit it was verified on.",
    projects: [
      {
        title: "vpay-skills",
        monogram: "vp",
        description: "Agent skills for vpay.",
        link: "https://vpay-oss.vaam.store/skills",
        repo: "vaam-apps/vpay-skills",
        tags: ["Skills"],
      },
      {
        title: "vsms-skills",
        monogram: "vs",
        description: "Agent skills for vsms.",
        link: "https://github.com/vaam-apps/vsms-skills#readme",
        repo: "vaam-apps/vsms-skills",
        tags: ["Skills"],
      },
      {
        title: "emgr-skills",
        monogram: "em",
        description: "Agent skills for emgr.",
        link: "https://github.com/vaam-apps/emgr-skills#readme",
        repo: "vaam-apps/emgr-skills",
        tags: ["Skills"],
      },
      {
        title: "fyi-skills",
        monogram: "fy",
        description: "Agent skills for fyi.",
        link: "https://github.com/vaam-apps/fyi-skills#readme",
        repo: "vaam-apps/fyi-skills",
        tags: ["Skills"],
      },
    ],
  },
];

/** The handful the home page leads with. */
export const featured: Project[] = [...(groups[0]?.projects ?? []), ...(groups[1]?.projects ?? [])];
