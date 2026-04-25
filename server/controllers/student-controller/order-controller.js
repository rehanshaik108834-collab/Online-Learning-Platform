const Order = require("../../models/Order");
const Course = require("../../models/Course");
const StudentCourses = require("../../models/StudentCourses");

const createOrder = async (req, res) => {
  try {
    const {
      userId,
      userName,
      userEmail,
      instructorId,
      instructorName,
      courseImage,
      courseTitle,
      courseId,
      coursePricing,
    } = req.body;

    const newlyCreatedCourseOrder = new Order({
      userId,
      userName,
      userEmail,
      orderStatus: "confirmed",
      paymentMethod: "free",
      paymentStatus: "paid",
      orderDate: new Date(),
      paymentId: "",
      payerId: "",
      instructorId,
      instructorName,
      courseImage,
      courseTitle,
      courseId,
      coursePricing,
    });

    await newlyCreatedCourseOrder.save();

    const studentCourses = await StudentCourses.findOne({
      userId: newlyCreatedCourseOrder.userId,
    });

    if (studentCourses) {
      studentCourses.courses.push({
        courseId: newlyCreatedCourseOrder.courseId,
        title: newlyCreatedCourseOrder.courseTitle,
        instructorId: newlyCreatedCourseOrder.instructorId,
        instructorName: newlyCreatedCourseOrder.instructorName,
        dateOfPurchase: newlyCreatedCourseOrder.orderDate,
        courseImage: newlyCreatedCourseOrder.courseImage,
      });

      await studentCourses.save();
    } else {
      const newStudentCourses = new StudentCourses({
        userId: newlyCreatedCourseOrder.userId,
        courses: [
          {
            courseId: newlyCreatedCourseOrder.courseId,
            title: newlyCreatedCourseOrder.courseTitle,
            instructorId: newlyCreatedCourseOrder.instructorId,
            instructorName: newlyCreatedCourseOrder.instructorName,
            dateOfPurchase: newlyCreatedCourseOrder.orderDate,
            courseImage: newlyCreatedCourseOrder.courseImage,
          },
        ],
      });

      await newStudentCourses.save();
    }

    await Course.findByIdAndUpdate(newlyCreatedCourseOrder.courseId, {
      $addToSet: {
        students: {
          studentId: newlyCreatedCourseOrder.userId,
          studentName: newlyCreatedCourseOrder.userName,
          studentEmail: newlyCreatedCourseOrder.userEmail,
          paidAmount: newlyCreatedCourseOrder.coursePricing,
        },
      },
    });

    res.status(201).json({
      success: true,
      data: {
        orderId: newlyCreatedCourseOrder._id,
        order: newlyCreatedCourseOrder,
      },
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      success: false,
      message: "Some error occured!",
    });
  }
};

module.exports = { createOrder };

