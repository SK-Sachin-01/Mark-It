const Highlight = require('../models/Highlight');
const User = require('../models/User');

exports.saveHighlight = async (req, res) => {
  try {
    console.log("Entered saveHighlight")
    const { url,color,text,serializedRange} = req.body;
    // console.log("Hi user: ",req)
    const userId = req.user._id;
    
    const highlight = new Highlight({ url,color,text,serializedRange,user: userId});
    console.log("New Highlight Entry: ",highlight)
    await highlight.save();

    const user = await User.findById(userId);
    user.highlight.push(highlight._id);
    await user.save();

    res.status(201).json(highlight);
  } 
  catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
};

exports.getUrlHighlights = async (req, res) => {
  try {
    const { url } = req.query;
    const userId = req.user.id;

    const highlights = await Highlight.find({ url, user: userId });
    res.status(200).json(highlights);
  } 
  catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
};

// exports.deleteHighlight = async (req, res) => {
//   try {
//     console.log("1");
//     const highlightId = req.params.id;
//     console.log("2");
//     const userId = req.user.id;
//     console.log("3");

//     const highlight = await Highlight.findOneAndDelete({ _id: highlightId, user: userId });
//     if (!highlight) {
//       return res.status(404).json({ error: 'Highlight not found' });
//     }

//     const user = await User.findById(userId);
//     user.highlight.pull(highlightId);
//     await user.save();

//     res.status(200).json({ message: 'Highlight deleted' });
//   } 
//   catch (err) {
//     res.status(500).json({ error: 'Server error' });
//   }
// };


exports.deleteHighlight = async (req, res) => {
  try {
    console.log("Entering deleteHighlight controller")
    const highlightId = req.body._id;
    
    // Find the course
    const highlight = await Highlight.findById(highlightId)
    if (!highlight) {
      return res.status(404).json({ message: "Highlight not found" })
    }
    
    // Delete the course
    await Highlight.findByIdAndDelete(highlightId)
    
    return res.status(200).json({
      success: true,
      message: "Highlight deleted successfully",
    })
  } 
  catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message,
    })
  }
}

// exports.getUserHighlights2 = async (req, res) => {
//   try {

//     const allCourses = await Course.find(
//       { status: "Published" },
//       {
//         courseName: true,
//         price: true,
//         thumbnail: true,
//         instructor: true,
//         ratingAndReviews: true,
//         studentsEnrolled: true,
//       }
//     )
//       .populate("instructor")
//       .exec()

//     return res.status(200).json({
//       success: true,
//       data: allCourses,
//     })
//   } catch (error) {
//     console.log(error)
//     return res.status(404).json({
//       success: false,
//       message: `Can't Fetch Course Data`,
//       error: error.message,
//     })
//   }
// }

exports.getUserHighlights = async (req, res) => {
  try {
    // Get the user ID from the authenticated user or request body
    const userId = req.user.id

    // Find all highlights belonging to the user
    const userHighlights = await Highlight.find({
      user: userId,
    }).sort({ createdAt: -1 })

    // Return the user's highlights
    res.status(200).json({
      success: true,
      data: userHighlights,
    })
  } 
  catch (error) {
    console.error(error)
    res.status(500).json({
      success: false,
      message: "Failed to retrieve instructor courses",
      error: error.message,
    })
  }
}
