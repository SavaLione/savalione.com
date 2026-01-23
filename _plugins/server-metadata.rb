module Jekyll
    class ServerMetadata < Generator
        safe true
        priority :highest

        def generate(site)
            # Operating System information
            os_name = "unknown"
            if File.exist?('/etc/os-release')
                File.readlines('/etc/os-release').each do |line|
                    if line.start_with?('PRETTY_NAME=')
                        os_name = line.split('=', 2).last.strip.gsub('"', '')
                        break
                    end
                end
            end

            # Check virtualization
            virt_type = `systemd-detect-virt 2>/dev/null`.strip
            virt_type = "Bare metal" if virt_type.empty?

            # CPU
            cpu_model = "Unknown CPU"
            cpu_count = 0
            if File.exist?('/proc/cpuinfo')
                cpu_info = File.read('/proc/cpuinfo')
                match = cpu_info.match(/model name\s+:\s+(.*)/)
                cpu_model = match[1] if match
                cpu_count = cpu_info.scan(/^processor/).count
            end

            # RAM
            mem_total_mb = "Unknown"
            if File.exist?('/proc/meminfo')
                mem_kb = File.read('/proc/meminfo').match(/MemTotal:\s+(\d+)\s/)[1].to_i
                mem_total_mb = (mem_kb / 1024)
            end

            # Tools
            go_version = `go version 2>/dev/null`.strip.split(' ')[2] || "N/A"
            gcc_version = `gcc --version 2>/dev/null`.lines.first&.strip.split(' ')[3] || "N/A"
            git_version = `git --version 2>/dev/null`.strip.split(' ')[2] || "N/A"

            nginx_raw = `nginx -version 2>&1`.strip
            if nginx_raw.downcase.include?("nginx version:")
                nginx_version = nginx_raw.split(' ')[2]
            else
                nginx_version = "N/A"
            end
      
            # Injecting data into site.data
            site.data['server'] = {
                'hostname' => `hostname`.strip,
                'kernel' => `uname -r`.strip,
                'distro' => os_name,
                'virt' => virt_type,
                'cpu' => "#{cpu_model} (#{cpu_count} vCPUs)",
                'ram' => mem_total_mb,
                'tools' => {
                    'go' => go_version,
                    'gcc' => gcc_version,
                    'git' => git_version,
                    'nginx' => nginx_version,
                    'ruby' => RUBY_VERSION,
                    'jekyll' => Jekyll::VERSION
                }
            }
        end
    end
end