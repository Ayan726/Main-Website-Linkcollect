import React, { useState, useEffect } from "react";
import { getAllByUsername } from "../../../api-services/collectionService";
import CollectionitemV2 from "../../Common/CollectionCard";
import Carousel from "../LandingPageV2/components/Carousel";

const MoreFromUser = ({ collectionData, user }) => {

    const [isLoading, setIsLoading] = useState(false);
    const [userCollections, setUserCollections] = useState([])

    useEffect(() => {
        async function fetchUserCollections() {
            try {
                const userCollections = await getAllByUsername(user);
                setUserCollections(userCollections);
            } catch (error) {
                console.error(error);
                return undefined;
            }
        }

        setIsLoading(true);
        fetchUserCollections()
        setIsLoading(false);
    
      return () => {
        
      }
    }, [])
    
    console.log(userCollections);

    return(
        userCollections?.data?.data.length > 1 && <div className="w-full min-h-[200px] border-t-2 border-neutral-300">
            <div className="flex flex-col w-full items-start py-[5rem]">
                <h2 className="text-[1.75rem] px-[clamp(1rem,5vw,5rem)]">{`More from ${user}`}</h2>
                <Carousel className={"px-[clamp(1rem,5vw,5rem)] pt-[2rem]"} fullWidth={false} isAutoScroll={false}>
                {userCollections?.data?.data.filter((collection) => {
                    return collection._id !== collectionData.collectionData._id
                }).map((collection) => {
                    return (
                        <div key={collection._id} className='min-w-[300px] rounded-md hover:scale-[103%] hover:shadow-xl transition'>
                          <CollectionitemV2
                              isHoverable={false}
                              id={collection._id}
                              image={collection.image}
                              title={collection.title}
                              links={collection.countOfLinks}
                              username={collection.username}
                              isPublic={collection.isPublic}
                              isPinned={collection.isPinned}
                              description={collection.description}
                              tags={collection.tags}
                              isOwner={false}
                              upvotes={collection.upvotes}
                              views={collection.views}
                          />
                        </div>
                        )
                })}
                </Carousel>
            </div>
        </div>
    )
}

export default MoreFromUser;