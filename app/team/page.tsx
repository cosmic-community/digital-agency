import { cosmic } from '@/lib/cosmic'
import { TeamMember } from '@/types'

export default async function TeamPage() {
  try {
    const { objects: teamMembers } = await cosmic.objects
      .find({
        type: 'team-members',
      })
      .props(['title', 'slug', 'metadata'])
      .depth(1) as { objects: TeamMember[] }

    // Sort by display_order
    const sortedTeamMembers = teamMembers.sort((a, b) => 
      (a.metadata.display_order || 999) - (b.metadata.display_order || 999)
    )

    return (
      <div className="min-h-screen bg-white">
        {/* Hero Section */}
        <section className="py-20 bg-gradient-to-r from-blue-600 to-purple-600">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
                Meet Our Team
              </h1>
              <p className="text-xl text-blue-100 max-w-3xl mx-auto">
                The creative minds and technical experts behind our digital solutions
              </p>
            </div>
          </div>
        </section>

        {/* Team Grid */}
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {sortedTeamMembers.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-gray-500 text-lg">No team members found.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {sortedTeamMembers.map((member) => (
                  <div key={member.id} className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
                    {/* Profile Photo */}
                    <div className="aspect-square overflow-hidden">
                      {member.metadata.profile_photo ? (
                        <img
                          src={`${member.metadata.profile_photo.imgix_url}?w=400&h=400&fit=crop&auto=format,compress`}
                          alt={member.metadata.full_name}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                          <svg className="w-24 h-24 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                          </svg>
                        </div>
                      )}
                    </div>

                    {/* Member Info */}
                    <div className="p-6">
                      <h3 className="text-xl font-bold text-gray-900 mb-1">
                        {member.metadata.full_name}
                      </h3>
                      <p className="text-blue-600 font-medium mb-3">
                        {member.metadata.job_title}
                      </p>
                      {member.metadata.department && (
                        <span className="inline-block px-3 py-1 text-sm bg-gray-100 text-gray-700 rounded-full mb-4">
                          {member.metadata.department.value}
                        </span>
                      )}
                      <p className="text-gray-600 text-sm leading-relaxed mb-4">
                        {member.metadata.bio}
                      </p>

                      {/* Social Links */}
                      {member.metadata.social_links && Object.keys(member.metadata.social_links).length > 0 && (
                        <div className="flex space-x-3">
                          {member.metadata.social_links.linkedin && (
                            <a
                              href={member.metadata.social_links.linkedin}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-gray-400 hover:text-blue-600 transition-colors"
                            >
                              <span className="sr-only">LinkedIn</span>
                              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M16.338 16.338H13.67V12.16c0-.995-.017-2.277-1.387-2.277-1.39 0-1.601 1.086-1.601 2.207v4.248H8.014v-8.59h2.559v1.174h.037c.356-.675 1.227-1.387 2.526-1.387 2.703 0 3.203 1.778 3.203 4.092v4.711zM5.005 6.575a1.548 1.548 0 11-.003-3.096 1.548 1.548 0 01.003 3.096zm-1.337 9.763H6.34v-8.59H3.667v8.59zM17.668 1H2.328C1.595 1 1 1.581 1 2.298v15.403C1 18.418 1.595 19 2.328 19h15.34c.734 0 1.332-.582 1.332-1.299V2.298C19 1.581 18.402 1 17.668 1z" clipRule="evenodd" />
                              </svg>
                            </a>
                          )}
                          {member.metadata.social_links.twitter && (
                            <a
                              href={member.metadata.social_links.twitter}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-gray-400 hover:text-blue-600 transition-colors"
                            >
                              <span className="sr-only">Twitter</span>
                              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                                <path d="M6.29 18.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0020 3.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.073 4.073 0 01.8 7.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 010 16.407a11.616 11.616 0 006.29 1.84" />
                              </svg>
                            </a>
                          )}
                          {member.metadata.social_links.github && (
                            <a
                              href={member.metadata.social_links.github}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-gray-400 hover:text-blue-600 transition-colors"
                            >
                              <span className="sr-only">GitHub</span>
                              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M10 0C4.477 0 0 4.484 0 10.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0110 4.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.203 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.942.359.31.678.921.678 1.856 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0020 10.017C20 4.484 15.522 0 10 0z" clipRule="evenodd" />
                              </svg>
                            </a>
                          )}
                          {member.metadata.social_links.dribbble && (
                            <a
                              href={member.metadata.social_links.dribbble}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-gray-400 hover:text-pink-600 transition-colors"
                            >
                              <span className="sr-only">Dribbble</span>
                              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M10 0C4.477 0 0 4.484 0 10.017c0 5.533 4.477 10.017 10 10.017s10-4.484 10-10.017C20 4.484 15.523 0 10 0zm6.823 4.823A8.192 8.192 0 0118.7 10c-.518 0-1.028-.044-1.527-.126-.094-.274-.198-.546-.314-.814l-.014-.034c-.297-.732-.65-1.434-1.048-2.098.604-.515 1.131-1.101 1.548-1.749zM10 1.75c1.63 0 3.15.485 4.426 1.316-.318.5-.708.967-1.151 1.393-.465-.846-.998-1.637-1.592-2.366A8.23 8.23 0 0110 1.75zM3.177 4.823c.417.648.944 1.234 1.548 1.749-.398.664-.751 1.366-1.048 2.098l-.014.034c-.116.268-.22.54-.314.814A8.19 8.19 0 011.3 10c0-1.97.7-3.78 1.877-5.177z" clipRule="evenodd" />
                              </svg>
                            </a>
                          )}
                        </div>
                      )}

                      {/* Email Contact */}
                      {member.metadata.email && (
                        <div className="mt-4">
                          <a
                            href={`mailto:${member.metadata.email}`}
                            className="text-sm text-blue-600 hover:text-blue-700 transition-colors"
                          >
                            {member.metadata.email}
                          </a>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>
      </div>
    )
  } catch (error) {
    console.error('Error fetching team members:', error)
    return (
      <div className="min-h-screen bg-white">
        <section className="py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Team</h1>
            <p className="text-gray-500">Unable to load team members at this time.</p>
          </div>
        </section>
      </div>
    )
  }
}

export const metadata = {
  title: 'Our Team | Digital Agency',
  description: 'Meet the creative minds and technical experts behind our digital solutions.',
}