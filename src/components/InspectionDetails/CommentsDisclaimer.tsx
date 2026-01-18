interface CommentsDisclaimerProps {
  comments: string[];
  disclaimer: string;
}

const CommentsDisclaimer = ({ comments, disclaimer }: CommentsDisclaimerProps) => {
  return (
    <div className="mt-6">
      <div className="mb-6">
        <h3 className="text-xl font-semibold text-black mb-4" style={{ fontFamily: "'Chakra Petch', sans-serif" }}>Comments</h3>
        <div className="space-y-2">
          {comments.map((comment, index) => (
            <p key={index} className="text-lg font-normal text-black ">
              {comment}
            </p>
          ))}
        </div>
      </div>

      <div className="border-t border-dashed border-gray-400 my-6"></div>

      <div>
        <h3 className="text-xl font-semibold text-black mb-4" style={{ fontFamily: "'Chakra Petch', sans-serif" }}>Disclaimer:</h3>
        <p className="text-lg font-normal text-black">{disclaimer}</p>
      </div>
    </div>
  );
};

export default CommentsDisclaimer;
