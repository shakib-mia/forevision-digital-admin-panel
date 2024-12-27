import Arrow from "../Arrow/Arrow";
import PropTypes from "prop-types";

const HeaderData = ({ icon, heading, count, progress, increased }) => {
  return (
    <div className="flex gap-1">
      {icon}
      <aside>
        <p className="text-subtitle-1">{heading}</p>
        <h5 className="font-semibold">{count}</h5>
        {/* <div className="flex items-center relative -left-3 mt-[4px]">
          <Arrow increased={increased} />
          <p className='text-subtitle-1 font-semibold'>{progress}</p>
        </div> */}
      </aside>
    </div>
  );
};

HeaderData.propTypes = {
  increased: PropTypes.bool.isRequired,
  progress: PropTypes.string.isRequired,
  count: PropTypes.number.isRequired,
  heading: PropTypes.string.isRequired,
  icon: PropTypes.string.isRequired,
};

export default HeaderData;
