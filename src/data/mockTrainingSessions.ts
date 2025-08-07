import { TrainingSession } from '@/types/training';

export const mockTrainingSessions: TrainingSession[] = [
  {
    id: 1,
    week: 1,
    dayOfWeek: "Thứ 2",
    scheduledTime: "Sáng",
    durationHours: 4,
    topic: "Hội nhập và định hướng",
    lesson: "Giới thiệu tổ chức và văn hóa Teky\nQuy định và quy trình làm việc",
    prerequisites: "Không có",
    content: "Giới thiệu về Teky, văn hóa công ty, tầm nhìn và sứ mệnh. Hướng dẫn quy trình làm việc, chính sách nhân sự, an toàn lao động.",
    preTrainingRequirements: [
      "Hoàn thành các giấy tờ nhập học",
      "Chuẩn bị laptop và thiết bị cần thiết"
    ],
    category: "Kiến thức",
    trainingFormat: "Trực tiếp",
    overviewDescription: "Buổi định hướng ban đầu giúp trainee hiểu về môi trường làm việc và các quy định cơ bản.",
    traineePreTrainingActivities: [
      "Đọc tài liệu về Teky được gửi qua email",
      "Chuẩn bị các câu hỏi muốn tìm hiểu"
    ],
    traineeInPostTrainingActivities: [
      "Hoàn thành bài kiểm tra hiểu biết về quy định",
      "Thiết lập tài khoản các hệ thống nội bộ"
    ],
    validation: [
      "Bài kiểm tra đạt 80% trở lên",
      "Hoàn thành setup tài khoản"
    ],
    internalTrainingLinks: ["https://daotaonoibo.teky.edu.vn/course/view.php?id=1"],
    masterPlanLink: "https://docs.google.com/document/d/1_example",
    slideLink: "https://docs.google.com/presentation/d/1_example",
    responsibleTeam: "PD",
    validationDeadline: ["Cuối tuần 1"],
    supportStaff: "HR Team",
    relatedForms: "Form đánh giá hội nhập"
  },
  {
    id: 2,
    week: 1,
    dayOfWeek: "Thứ 3",
    scheduledTime: "Chiều",
    durationHours: 3,
    topic: "Xác thực kiến thức giảng dạy",
    lesson: "Tổng quan môn học, lộ trình K8\nĐào tạo công cụ Codekitten (BLG - HP1)",
    prerequisites: "Không có",
    content: "Giới thiệu lộ trình đào tạo, cách xác thực năng lực giáo viên, Giới thiệu Lộ trình K8, tổng quan các môn học. Trainer hình dung tổng quan được về các môn học tại Teky, độ tuổi HS, sản phẩm đầu ra của từng môn, \nĐào tạo BLG ở HP1. Mục tiêu: Hoàn thành xong việc Xác thực năng lực môn học BLG - Hp1 một sản phẩm cơ bản, có tính cá nhân hóa đáp ứng cho HP1.",
    preTrainingRequirements: [
      "Tài khoản ĐTNB có các khoá học liên quan: Hội nhập, Đào tạo kiến thức BLG, KPRB.",
      "Nắm được tổng quan vị trí các tài liệu nhận được, biết cách tìm ra tài liệu cần thiết",
      "Tích hợp các nội dung cần thiết vào chatbot của hệ thống đào tạo để người học được làm quen với công cụ"
    ],
    category: "Kiến thức & Thực hành",
    trainingFormat: "Trực tiếp",
    overviewDescription: "I. Mục tiêu \nNắm tổng quan các môn học mảng C tại Teky, độ tuổi phù hợp, cấu trúc học phần – học kỳ, thời lượng buổi học, sản phẩm định hướng và mối liên kết, bổ trợ giữa các môn.\nHoàn thành Xác thực kiến thức BLG - HP1 \nII. Triển khai \n- Trainer kiểm tra lại các thông tin Trainee đã đọc/nhớ thông qua các câu hỏi. Tiến hành sơ đồ hoá các thông tin về Lộ trình K8 cho Trainee trong 1.5h. \n- Trainer kiểm tra sản phẩm Trainee đã làm trước đó theo hướng dẫn chi tiết (được gửi cho Trainee trước đó). Kiểm tra ngẫu nhiên một vài kiến thức. Trainer hướng dẫn về cách thức Xác thực kiến thức nói chung, kiến thức BLG - HP1 nói riêng. Trainee thực hiện một sản phẩm đảm bảo yêu cầu về kiến thức của BLG - HP1 trong 60 - 90p. Sau khi hoàn thành, Trainer sẽ kiểm tra và góp ý để hoàn thiện sản phẩm. Trainee sẽ quay video giới thiệu sản phẩm từ 15 -20p và nộp lên ĐTNB. Yêu cầu Trainee hoàn thành video giới thiệu sản phẩm và nộp lên hệ thống trong buổi, nếu Trainee không hoàn thành trong ca làm việc thì sẽ phải thực hiện đến khi hoàn thành. ",
    traineePreTrainingActivities: [
      "Tự đọc tài liệu về Tổng quan các môn học tại Teky.",
      "Tạo tài khoản Codekitten.",
      "Làm quen công cụ Codekitten bằng việc tạo ra sản phẩm \"Mèo bắt chuột\" theo hướng dẫn chi tiết."
    ],
    traineeInPostTrainingActivities: [
      "Sơ đồ hoá Lộ trình K8",
      "Điều chỉnh các vấn đề tồn đọng trong sản phẩm sau khi tham khảo góp ý của Trainer.",
      "Cá nhân hoá sản phẩm.",
      "Xây dựng sản phẩm 1 bài học Offset.",
      "Quay video chia sẻ sản phẩm BLG - HP1 và nộp lên hệ thống ĐTNB theo quy định."
    ],
    validation: [
      "Sơ đồ hoá K8 (Trainer check)",
      "Video giới thiệu sản phẩm CodeKitten đã hoàn thiện trong buổi và nộp lên ĐTNB"
    ],
    internalTrainingLinks: [
      "https://daotaonoibo.teky.edu.vn/course/view.php?id=35",
      "https://daotaonoibo.teky.edu.vn/course/view.php?id=12",
      "https://daotaonoibo.teky.edu.vn/course/view.php?id=53"
    ],
    masterPlanLink: "https://docs.google.com/document/d/1_YOAV-NaH_IF4s5x0pde33xQt8lxQMUO4u0avcrOals/edit?usp=sharing",
    slideLink: "https://docs.google.com/document/d/1RgO7af_VaAQAWwe_7eAveB44Jjgbbc6PsV0vA6oL-vU/edit?usp=sharing",
    responsibleTeam: "PD",
    validationDeadline: [
      "Sản phẩm buổi học Offset: trong thứ 3 tuần đào tạo đầu tiên",
      "Sản phẩm BLG HP1: trong thứ 4 tuần đào tạo đầu tiên"
    ],
    supportStaff: "",
    relatedForms: ""
  },
  {
    id: 3,
    week: 1,
    dayOfWeek: "Thứ 4",
    scheduledTime: "Sáng",
    durationHours: 4,
    topic: "Phương pháp giảng dạy",
    lesson: "Kỹ năng giao tiếp với học sinh\nPhương pháp sư phạm hiện đại",
    prerequisites: "Hoàn thành buổi 2",
    content: "Học cách giao tiếp hiệu quả với trẻ em, phương pháp giảng dạy tích cực, quản lý lớp học, xử lý tình huống.",
    preTrainingRequirements: [
      "Xem video về phương pháp sư phạm",
      "Chuẩn bị case study về tình huống lớp học"
    ],
    category: "Thực hành",
    trainingFormat: "Trực tiếp",
    overviewDescription: "Phát triển kỹ năng sư phạm cần thiết cho việc giảng dạy trẻ em một cách hiệu quả và tích cực.",
    traineePreTrainingActivities: [
      "Nghiên cứu tâm lý trẻ em theo độ tuổi",
      "Xem các video demo giảng dạy mẫu"
    ],
    traineeInPostTrainingActivities: [
      "Thực hành demo giảng 15 phút",
      "Nhận feedback và cải thiện"
    ],
    validation: [
      "Demo giảng đạt yêu cầu",
      "Xử lý case study thành công"
    ],
    internalTrainingLinks: ["https://daotaonoibo.teky.edu.vn/course/view.php?id=20"],
    masterPlanLink: "https://docs.google.com/document/d/pedagogy_plan",
    slideLink: "https://docs.google.com/presentation/d/pedagogy_slides",
    responsibleTeam: "TC",
    validationDeadline: ["Cuối tuần 1"],
    supportStaff: "Senior Trainer",
    relatedForms: "Form đánh giá kỹ năng giảng dạy"
  },
  {
    id: 4,
    week: 1,
    dayOfWeek: "Thứ 5",
    scheduledTime: "Chiều",
    durationHours: 3,
    topic: "Công nghệ giáo dục",
    lesson: "Sử dụng platform Teky\nCông cụ hỗ trợ giảng dạy",
    prerequisites: "Hoàn thành buổi 1, 2, 3",
    content: "Hướng dẫn sử dụng các công cụ công nghệ trong giảng dạy, platform học tập, quản lý tiến độ học sinh.",
    preTrainingRequirements: [
      "Tạo tài khoản trên platform Teky",
      "Cài đặt các ứng dụng cần thiết"
    ],
    category: "Kiến thức & Thực hành",
    trainingFormat: "OMO",
    overviewDescription: "Nắm vững cách sử dụng công nghệ để nâng cao hiệu quả giảng dạy và quản lý học sinh.",
    traineePreTrainingActivities: [
      "Khám phá giao diện platform",
      "Thực hành tạo bài giảng mẫu"
    ],
    traineeInPostTrainingActivities: [
      "Tạo một khóa học demo hoàn chỉnh",
      "Test các tính năng tương tác"
    ],
    validation: [
      "Demo khóa học hoàn chỉnh",
      "Sử dụng thành thạo các công cụ"
    ],
    internalTrainingLinks: ["https://daotaonoibo.teky.edu.vn/course/view.php?id=25"],
    masterPlanLink: "https://docs.google.com/document/d/edtech_plan",
    slideLink: "https://docs.google.com/presentation/d/edtech_slides",
    responsibleTeam: "SC",
    validationDeadline: ["Cuối tuần 1"],
    supportStaff: "IT Support",
    relatedForms: "Form đánh giá kỹ năng công nghệ"
  },
  {
    id: 5,
    week: 1,
    dayOfWeek: "Thứ 6",
    scheduledTime: "Sáng",
    durationHours: 2,
    topic: "Đánh giá tuần 1",
    lesson: "Tổng kết và đánh giá\nLập kế hoạch tuần 2",
    prerequisites: "Hoàn thành tất cả buổi tuần 1",
    content: "Đánh giá tổng quan tiến độ tuần 1, feedback từ trainer, lập kế hoạch học tập cho tuần tiếp theo.",
    preTrainingRequirements: [
      "Hoàn thành tất cả bài tập tuần 1",
      "Chuẩn bị báo cáo tự đánh giá"
    ],
    category: "KPI",
    trainingFormat: "Trực tiếp",
    overviewDescription: "Đánh giá toàn diện năng lực và tiến độ của trainee sau tuần đầu tiên.",
    traineePreTrainingActivities: [
      "Tự đánh giá điểm mạnh và điểm cần cải thiện",
      "Chuẩn bị các câu hỏi về tuần tiếp theo"
    ],
    traineeInPostTrainingActivities: [
      "Xây dựng kế hoạch cải thiện cá nhân",
      "Nghiên cứu trước nội dung tuần 2"
    ],
    validation: [
      "Đạt 75% tổng điểm đánh giá tuần 1",
      "Có kế hoạch cụ thể cho tuần 2"
    ],
    internalTrainingLinks: ["https://daotaonoibo.teky.edu.vn/course/view.php?id=30"],
    masterPlanLink: "https://docs.google.com/document/d/assessment_plan",
    slideLink: "https://docs.google.com/presentation/d/assessment_slides",
    responsibleTeam: "PD",
    validationDeadline: ["Cuối tuần 1"],
    supportStaff: "Assessment Team",
    relatedForms: "Form đánh giá tuần 1"
  },
  {
    id: 6,
    week: 2,
    dayOfWeek: "Thứ 2",
    scheduledTime: "Sáng",
    durationHours: 4,
    topic: "Chuyên môn lập trình nâng cao",
    lesson: "Python Programming cho trẻ em\nScratch nâng cao",
    prerequisites: "Đạt yêu cầu tuần 1",
    content: "Học cách giảng dạy Python và Scratch ở mức độ nâng cao, thiết kế bài tập phù hợp với từng độ tuổi.",
    preTrainingRequirements: [
      "Ôn tập kiến thức Python cơ bản",
      "Thực hành Scratch nâng cao"
    ],
    category: "Kiến thức & Thực hành",
    trainingFormat: "Trực tiếp",
    overviewDescription: "Nâng cao kỹ năng lập trình và phương pháp truyền đạt kiến thức lập trình cho trẻ em.",
    traineePreTrainingActivities: [
      "Hoàn thành khóa Python cơ bản",
      "Tạo 3 project Scratch demo"
    ],
    traineeInPostTrainingActivities: [
      "Thiết kế bài giảng Python cho lớp 6-8",
      "Tạo game Scratch có tính giáo dục"
    ],
    validation: [
      "Demo giảng Python 30 phút",
      "Project Scratch hoàn chỉnh"
    ],
    internalTrainingLinks: ["https://daotaonoibo.teky.edu.vn/course/view.php?id=40"],
    masterPlanLink: "https://docs.google.com/document/d/programming_plan",
    slideLink: "https://docs.google.com/presentation/d/programming_slides",
    responsibleTeam: "TC",
    validationDeadline: ["Giữa tuần 2"],
    supportStaff: "Programming Mentor",
    relatedForms: "Form đánh giá kỹ năng lập trình"
  }
];