import "./likebar.css";

const LikeBar = () => {
    return (
        <div className="likeBar">
            <div className="likeBar__wrap">
                <div className="likeBar__list">
                    <div className="likeBar__item">
                        <div className="likeBar__item_icon"><img src="/image/icon_like_fire.png" alt="" /></div>
                    </div>
                    <div className="likeBar__item">
                        <div className="likeBar__item_icon"><img src="/image/icon_like_star.png" alt="" /></div>
                    </div>
                    <div className="likeBar__item">
                        <div className="likeBar__item_icon"><img src="/image/icon_like_thumb.png" alt="" /></div>
                    </div>
                    <div className="likeBar__item">
                        <div className="likeBar__item_icon"><img src="/image/icon_like_love.png" alt="" /></div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default LikeBar;