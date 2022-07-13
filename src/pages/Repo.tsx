import { useQueryClient } from "react-query";
import { useParams } from "react-router-dom";
import { Repository } from "./Repos";

export function Repo() {
    const params = useParams()
    const currentRepo = params['*'] as string

    const queryClient = useQueryClient()

    async function handleRepoDescriptionChange() {
        const previousRepos = queryClient.getQueryData<Repository[]>('repos')

        if (previousRepos) {
            const nextRepos = previousRepos.map(repo => {
                repo.full_name === currentRepo ? { ...repo, description: 'Testing' } : repo
            })

            queryClient.setQueryData('repos', nextRepos)
        }
    }

    return (
        <div>
            <h1>{currentRepo}</h1>
            <button onClick={handleRepoDescriptionChange}>Change description</button>
        </div>
    )

}