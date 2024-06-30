from routes.stats import stats_router
from fastapi import status


@stats_router.get(
    "/",
    description="get stats",
    status_code=status.HTTP_200_OK,
)
async def get_stats():
    pass
