// Replace placeholder media with direct MP4/WebM URLs or files in public/media/.
// Paths without an initial slash work on both Vercel and GitHub project Pages.
export const portfolio = {
  brand: 'Chasse Studio',
  email: 'chaseestudio@gmail.com',
  wechat: 'ap4grc',
  contact: {
    titleZh: ['聊聊你的', '下一个海外项目。'],
    titleEn: ['Let’s talk about', 'your next project.'],
    descriptionZh: '视频项目咨询与合作，请通过邮箱或微信联系。',
    descriptionEn: 'For video project enquiries, please contact us by email or WeChat.',
  },
  hero: {
    titleLines: ['Local insight.', 'Built to convert.'],
    titleZh: '懂当地表达，让内容推动转化。',
    experienceZh: '澳洲本地生活经验 · 长期聚焦欧美市场',
    experienceEn: 'Australian lived experience. European & US market focus.',
    descriptionZh: '将澳洲生活中的真实感知，与持续面向欧美市场的创作经验结合，打造贴近当地语境的视频内容。让品牌表达更自然，让每一次观看更接近行动。',
    descriptionEn: 'Drawing on life in Australia and ongoing creative work for European and US markets, we create culturally relevant videos that turn attention into action.',
  },
  bio: 'Chasse Studio combines lived experience in Australia with years of video creative work for European and US markets. From familiar expressions and viewing habits to clear product messaging, we create videos that feel relevant to local audiences and support a clear marketing objective.',
  bioZh: 'Chasse Studio 将澳洲本地生活经验，与多年面向欧美市场的视频创作经验结合。从受众熟悉的表达方式、观看习惯，到产品信息的呈现，让视频贴近当地语境，并服务于明确的营销目标。',
  about: {
    titleZh: ['从澳洲生活出发，', '为欧美市场创作。'],
    titleEn: ['Informed by life in Australia.', 'Focused on Europe & the US.'],
    services: [
      { zh: 'Meta 广告', en: 'Meta ad creatives' },
      { zh: 'UGC 视频', en: 'UGC videos' },
      { zh: '品牌视频', en: 'Brand films' },
      { zh: 'AI 视频', en: 'AI videos' },
    ],
  },
  categories: ['All Work', 'Brand Film', 'UGC Video', 'AI Video', 'Meta Ads · Curated', 'Meta Ads · General'],
  categoryLabels: {
    'All Work': '全部作品',
    'AI Video': 'AI 视频',
    'Meta Ads · Curated': 'Meta 广告 · 精品',
    'Meta Ads · General': 'Meta 广告 · 普货',
    'Brand Film': '品牌视频',
    'UGC Video': 'UGC 视频',
  },
  projects: [
    { id: 'form', title: 'The quiet form', category: 'Meta Ads · Curated', format: '9:16', year: '2026', role: 'Editing · Color · Sound', cover: 'media/form.svg', preview: 'media/form.mp4', video: 'media/form.mp4', description: 'A placeholder Meta ad concept for a curated product range, exploring light, texture and product storytelling. Original abstract imagery; this is not commissioned or published campaign work.' },
    { id: 'otherworld', title: 'Somewhere, elsewhere', category: 'AI Video', format: '9:16', year: '2026', role: 'Visual concept · Editing', cover: 'media/otherworld.svg', preview: 'media/otherworld.mp4', video: 'media/otherworld.mp4', description: 'A visual direction study for a future AI video project. These original procedural shapes are placeholders, not a finished AI-generated film.' },
    { id: 'everyday', title: 'Everyday, reimagined', category: 'UGC Video', format: '9:16', year: '2026', role: 'Editing · Rhythm · Sound', cover: 'media/everyday.svg', preview: 'media/everyday.mp4', video: 'media/everyday.mp4', description: 'A social-first concept with a warm, everyday palette. The abstract composition stands in for future lifestyle footage.' },
    { id: 'between', title: 'The space between', category: 'Brand Film', format: '16:9', year: '2026', role: 'Story · Editing · Color', cover: 'media/between.svg', preview: 'media/between.mp4', video: 'media/between.mp4', description: 'A widescreen brand film study in architecture, space and stillness. This placeholder demonstrates native 16:9 playback without cropping.' },
    { id: 'afterhours', title: 'After hours', category: 'Meta Ads · General', format: '9:16', year: '2026', role: 'Editing · Motion · Sound', cover: 'media/afterhours.svg', preview: 'media/afterhours.mp4', video: 'media/afterhours.mp4', description: 'A placeholder Meta ad concept for a general product range, built around visual rhythm and a clear message. This is a category demo, not a published campaign.' },
    { id: 'flow', title: 'In a different light', category: 'AI Video', format: '16:9', year: '2026', role: 'Visual direction · Editing', cover: 'media/flow.svg', preview: 'media/flow.mp4', video: 'media/flow.mp4', description: 'An abstract motion study exploring balance and transformation. Original procedural placeholder footage for the AI Video category.' },
  ],
};

// Keep both languages together when replacing these concept projects.
const translations = {
  form: ['静物之间', '剪辑 · 调色 · 声音', '精品类 Meta 广告的概念占位示例，以光线、质感与克制的节奏探索产品表达。画面与视频均为原创占位素材，并非真实客户项目或已投放广告。'],
  otherworld: ['此处之外', '视觉概念 · 剪辑', '为未来 AI 影像项目探索视觉方向。当前为原创抽象图形演示，并非完成的 AI 生成影片。'],
  everyday: ['日常，另一面', '剪辑 · 节奏 · 声音', '以温暖、自然的色调构想社交平台内容。当前的抽象画面用于替代后续生活方式实拍素材。'],
  between: ['留白之处', '叙事 · 剪辑 · 调色', '关于建筑、空间与静谧的品牌短片构想。横屏演示按原生 16:9 比例播放，保留完整画面。'],
  afterhours: ['入夜之后', '剪辑 · 动态 · 声音', '普货类 Meta 广告的概念占位示例，探索鲜明节奏与清晰信息的结合。当前素材仅演示分类与播放效果，并非真实投放案例。'],
  flow: ['光的另一面', '视觉方向 · 剪辑', '关于平衡、流动与变化的抽象动态习作。当前为 AI 影像分类的原创占位演示。'],
};
portfolio.projects.forEach(project => {
  const [titleZh, roleZh, descriptionZh] = translations[project.id] ?? [];
  project.titleZh ??= titleZh ?? project.title;
  project.roleZh ??= roleZh ?? project.role;
  project.descriptionZh ??= descriptionZh ?? project.description;
});
