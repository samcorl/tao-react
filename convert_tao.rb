#!/usr/bin/env ruby
# Convert Tao Te Ching JSON to Markdown format

require 'json'

def convert_tao_to_markdown(input_file, output_file)
  begin
    # Read and parse JSON
    json_content = File.read(input_file)
    chapters = JSON.parse(json_content)
    
    # Write markdown
    File.open(output_file, 'w') do |f|
      f.puts "# Tao Te Ching\n\n"
      
      chapters.each_with_index do |chapter, index|
        f.puts "## Chapter #{index + 1}\n\n"
        
        chapter.each do |line|
          if line.strip.empty?
            f.puts ""  # Preserve empty lines as paragraph breaks
          else
            f.puts line
          end
        end
        
        f.puts "\n"  # Add space between chapters
      end
    end
    
    puts "Successfully converted #{chapters.length} chapters to #{output_file}"
    
  rescue Errno::ENOENT
    puts "Error: File #{input_file} not found"
    exit 1
  rescue JSON::ParserError
    puts "Error: Invalid JSON in #{input_file}"
    exit 1
  rescue => e
    puts "Error: #{e.message}"
    exit 1
  end
end

# Default files
input_file = ARGV[0] || "src/tao.json"
output_file = ARGV[1] || "tao.md"

puts "Converting #{input_file} to #{output_file}..."
convert_tao_to_markdown(input_file, output_file)