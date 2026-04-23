export type PostCategory = "logo" | "thumbnail" | "motion";

export type Post = {
  id: number;
  type: "image" | "video";
  src: string;
  likes: string;
  caption: string;
  category: PostCategory;
  res?: "1080x1920" | "1920x1080" | "1080x1440";
};

export type PostGroup = {
  projectId: number;
  projectName: string;
  posts: Post[];
};

export const POST_GROUPS: PostGroup[] = [
  {
    projectId: 1,
    projectName: "Ace Money Transfer",
    posts: [
      {
        id: 0,
        type: "image",
        category: "logo",
        src: "/photos/logo.svg",
        likes: "0",
        caption: "Brand logo",
      },

      {
        id: 1,
        type: "image",
        category: "thumbnail",
        src: "/photos/img1.png",
        likes: "4.2k",
        caption: "Clean lines and natural light. 🏛️✨ #architecture",
      },
      {
        id: 2,
        type: "image",
        category: "thumbnail",
        src: "/photos/img4.png",
        likes: "5.1k",
        caption: "Concrete and wood textures blending seamlessly.",
      },
      {
        id: 3,
        type: "image",
        category: "thumbnail",
        src: "/photos/img2.png",
        likes: "3.8k",
        caption: "Interior details that matter. 🛋️",
      },
      {
        id: 4,
        type: "image",
        category: "thumbnail",
        src: "/photos/img3.jpeg",
        likes: "5.1k",
        caption: "Concrete and wood textures blending seamlessly.",
      },
      {
        id: 5,
        type: "image",
        category: "thumbnail",
        src: "/photos/img6.webp",
        likes: "5.1k",
        caption: "Concrete and wood textures blending seamlessly.",
      },
      {
        id: 6,
        type: "image",
        category: "thumbnail",
        src: "/photos/img5.webp",
        likes: "5.1k",
        caption: "Concrete and wood textures blending seamlessly.",
      },

      {
        id: 7,
        type: "video",
        category: "motion",
        src: "/videos/AMT IS.mp4",
        likes: "5.1k",
        caption: "Vertical motion study - Abstract flows.",
        res: "1080x1920",
      },
      {
        id: 8,
        type: "video",
        category: "motion",
        src: "/videos/AMT L.mp4",
        likes: "5.1k",
        caption: "Horizontal motion study - Abstract flows.",
        res: "1920x1080",
      },
    ],
  },
  {
    projectId: 2,
    projectName: "Crispies uk",
    posts: [
      {
        id: 0,
        type: "image",
        category: "logo",
        src: "https://irp.cdn-website.com/f3edc476/dms3rep/multi/Asset+11+new-cbf9cc0a.svg",
        likes: "0",
        caption: "Brand logo",
      },

      {
        id: 1,
        type: "image",
        category: "thumbnail",
        src: "https://res.cloudinary.com/dwtskde96/image/upload/v1776779688/Artboard_3_vazv6f.jpg",
        likes: "4.2k",
        caption: "Clean lines and natural light. 🏛️✨ #architecture",
        res: "1080x1440",
      },
      {
        id: 2,
        type: "image",
        category: "thumbnail",
        src: "https://res.cloudinary.com/dwtskde96/image/upload/v1776779688/1_copy_3_fj7jqs.jpg",
        likes: "5.1k",
        res: "1080x1440",
        caption: "Concrete and wood textures blending seamlessly.",
      },
      {
        id: 3,
        type: "image",
        category: "thumbnail",
        src: "https://res.cloudinary.com/dwtskde96/image/upload/v1776779688/Artboard_2_mbuz7f.jpg",
        likes: "3.8k",
        res: "1080x1440",
        caption: "Interior details that matter. 🛋️",
      },
      {
        id: 4,
        type: "image",
        category: "thumbnail",
        src: "https://res.cloudinary.com/dwtskde96/image/upload/v1776779688/1_copy_y6pfol.jpg",
        likes: "5.1k",
        res: "1080x1440",
        caption: "Concrete and wood textures blending seamlessly.",
      },
      {
        id: 5,
        type: "image",
        category: "thumbnail",
        src: "https://res.cloudinary.com/dwtskde96/image/upload/v1776779688/1_copy_2_hwi1at.jpg",
        likes: "5.1k",
        res: "1080x1440",
        caption: "Concrete and wood textures blending seamlessly.",
      },
      {
        id: 6,
        type: "image",
        category: "thumbnail",
        src: "https://res.cloudinary.com/dwtskde96/image/upload/v1776779689/1_f7jevx.jpg",
        likes: "5.1k",
        res: "1080x1440",
        caption: "Concrete and wood textures blending seamlessly.",
      },

      {
        id: 7,
        type: "image",
        category: "thumbnail",
        src: "https://res.cloudinary.com/dwtskde96/image/upload/v1776779689/Artboard_12_ofwebt.jpg",
        likes: "5.1k",
        res: "1080x1440",
        caption: "Vertical motion study - Abstract flows.",
      },
      {
        id: 8,
        type: "image",
        category: "thumbnail",
        src: "https://res.cloudinary.com/dwtskde96/image/upload/v1776779689/Artboard_1_tpleey.jpg",
        likes: "5.1k",
        res: "1080x1440",
        caption: "Horizontal motion study - Abstract flows.",
      },
      {
        id: 8,
        type: "image",
        category: "thumbnail",
        src: "https://res.cloudinary.com/dwtskde96/image/upload/v1776779689/Artboard_4_nnx2p8.jpg",
        likes: "5.1k",
        res: "1080x1440",
        caption: "Horizontal motion study - Abstract flows.",
      },
      {
        id: 9,
        type: "image",
        category: "thumbnail",
        src: "https://res.cloudinary.com/dwtskde96/image/upload/v1776779689/Artboard_13_purbr0.jpg",
        likes: "5.1k",
        res: "1080x1440",
        caption: "Horizontal motion study - Abstract flows.",
      },
    ],
  },
];

export type Terminal = {
  id: number;
  name: string;
  code: string;
  password: string;
  logoImg: string;
  route: string;
  projectId: number;
};

// --- Mock Data ---

export const VAULT_TERMINALS: Terminal[] = [
  {
    id: 1,
    name: "Ace Money transfer",
    code: "TRX-01",
    password: "ace1",
    route: "/project/Acemoneytransfer",
    logoImg:
      "https://res.cloudinary.com/dwtskde96/image/upload/v1776787100/logo_y2klhn.svg",
    projectId: 1,
  },
  {
    id: 2,
    name: "Crispies uk",
    code: "GLN-02",
    password: "crispiesuk1",
    logoImg:
      "https://irp.cdn-website.com/f3edc476/dms3rep/multi/Asset+11+new-cbf9cc0a.svg",
    route: "/project/Crispiesuk",
    projectId: 2,
  },
];
