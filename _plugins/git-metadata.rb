module Jekyll
    class GitMetadata < Generator
        def generate(site)
            # The short Git hash (first 7 characters)
            hash = `git rev-parse --short HEAD`.strip
      
            # The full Git hash
            full_hash = `git rev-parse HEAD`.strip

            # The branch name
            branch = `git rev-parse --abbrev-ref HEAD`.strip
      
            # Injecting data into site.data
            site.data['git'] = {
                'hash' => hash,
                'full_hash' => full_hash,
                'branch' => branch
            }
        end
    end
end