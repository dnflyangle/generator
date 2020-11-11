create table meetup_groups
(
    create_timestamp timestamp DEFAULT CURRENT_TIMESTAMP not null,
    update_timestamp timestamp DEFAULT CURRENT_TIMESTAMP not null,
    office      	 text                                not null,
    group_name       text                                not null,
    primary key (group_name)
);

INSERT INTO meetup_groups(group_name, office) VALUES ('Sydney-Design-Thinking-Meetup', 'sydney');
INSERT INTO meetup_groups(group_name, office) VALUES ('fsharpsydney', 'sydney');
INSERT INTO meetup_groups(group_name, office) VALUES ('Sydney-Alt-Net', 'sydney');
INSERT INTO meetup_groups(group_name, office) VALUES ('Sydney-Microservices', 'sydney');
INSERT INTO meetup_groups(group_name, office) VALUES ('future-mobile-apps', 'sydney');
INSERT INTO meetup_groups(group_name, office) VALUES ('Data-Science-Sydney', 'sydney');
INSERT INTO meetup_groups(group_name, office) VALUES ('Health-Tech-Sydney', 'sydney');
INSERT INTO meetup_groups(group_name, office) VALUES ('kx-syd', 'sydney');
INSERT INTO meetup_groups(group_name, office) VALUES ('The-Sydney-Limited-WIP-Society', 'sydney');
INSERT INTO meetup_groups(group_name, office) VALUES ('Women-Who-Code-Sydney', 'sydney');
INSERT INTO meetup_groups(group_name, office) VALUES ('Sydney-Testers', 'sydney');
INSERT INTO meetup_groups(group_name, office) VALUES ('Ruby-On-Rails-Oceania-Sydney', 'sydney');
INSERT INTO meetup_groups(group_name, office) VALUES ('Continuous-Delivery-Sydney', 'sydney');
INSERT INTO meetup_groups(group_name, office) VALUES ('PMISydneyMeetup', 'sydney');
INSERT INTO meetup_groups(group_name, office) VALUES ('Sydney-Agile-Coach-Meetup', 'sydney');
INSERT INTO meetup_groups(group_name, office) VALUES ('devops-sydney', 'sydney');
INSERT INTO meetup_groups(group_name, office) VALUES ('Azure-Sydney-User-Group', 'sydney');
INSERT INTO meetup_groups(group_name, office) VALUES ('AWS-Sydney', 'sydney');
INSERT INTO meetup_groups(group_name, office) VALUES ('Disruptors-in-Tech', 'sydney');
INSERT INTO meetup_groups(group_name, office) VALUES ('Sydney-Cloud-Foundry-Meetup', 'sydney');
INSERT INTO meetup_groups(group_name, office) VALUES ('Ansible-Sydney', 'sydney');
INSERT INTO meetup_groups(group_name, office) VALUES ('digitalgov-nsw', 'sydney');
INSERT INTO meetup_groups(group_name, office) VALUES ('ProductTank-Sydney', 'sydney');
INSERT INTO meetup_groups(group_name, office) VALUES ('Big-Data-Analytics', 'sydney');
INSERT INTO meetup_groups(group_name, office) VALUES ('Adobe-Experience-Manager-AEM-CQ-Meetup-in-Sydney', 'sydney');
INSERT INTO meetup_groups(group_name, office) VALUES ('SydneyMUG', 'sydney');
INSERT INTO meetup_groups(group_name, office) VALUES ('clj-syd', 'sydney');
INSERT INTO meetup_groups(group_name, office) VALUES ('Sydney-Puppet-User-Group', 'sydney');
INSERT INTO meetup_groups(group_name, office) VALUES ('Sydney-AWS-Security-User-Group', 'sydney');
INSERT INTO meetup_groups(group_name, office) VALUES ('Agile-Scale', 'sydney');
INSERT INTO meetup_groups(group_name, office) VALUES ('Australian-OpenStack-User-Group', 'sydney');
INSERT INTO meetup_groups(group_name, office) VALUES ('Sydney-CoreOS-User-Group', 'sydney');
INSERT INTO meetup_groups(group_name, office) VALUES ('OzBerryPi', 'sydney');
INSERT INTO meetup_groups(group_name, office) VALUES ('scalasyd', 'sydney');
INSERT INTO meetup_groups(group_name, office) VALUES ('ar_syd', 'sydney');
INSERT INTO meetup_groups(group_name, office) VALUES ('Sydney-FinTech-Startups', 'sydney');
INSERT INTO meetup_groups(group_name, office) VALUES ('coding-dojo-sydney', 'sydney');
INSERT INTO meetup_groups(group_name, office) VALUES ('Deep-Learning-Sydney', 'sydney');
INSERT INTO meetup_groups(group_name, office) VALUES ('Sydney-Apidays', 'sydney');
INSERT INTO meetup_groups(group_name, office) VALUES ('Sydney-Agile-Business-Analysts-Product-Owners', 'sydney');
INSERT INTO meetup_groups(group_name, office) VALUES ('React-Native-Sydney', 'sydney');
INSERT INTO meetup_groups(group_name, office) VALUES ('React-Sydney', 'sydney');
INSERT INTO meetup_groups(group_name, office) VALUES ('sydneycocoaheads', 'sydney');
INSERT INTO meetup_groups(group_name, office) VALUES ('Interaction-Design-Foundation-Sydney', 'sydney');
INSERT INTO meetup_groups(group_name, office) VALUES ('Internet-of-Things-Sydney', 'sydney');
INSERT INTO meetup_groups(group_name, office) VALUES ('Sydney-Game-Engine-Developers', 'sydney');
INSERT INTO meetup_groups(group_name, office) VALUES ('Sydney-Elm-Meetup', 'sydney');
INSERT INTO meetup_groups(group_name, office) VALUES ('Big-Data-Sydney', 'sydney');
INSERT INTO meetup_groups(group_name, office) VALUES ('sydney-ex', 'sydney');
INSERT INTO meetup_groups(group_name, office) VALUES ('Sydney-Docker-User-Group', 'sydney');
INSERT INTO meetup_groups(group_name, office) VALUES ('All-Things-API-REST-Cloud-Integrations-SaaS-Sydney-AU', 'sydney');
INSERT INTO meetup_groups(group_name, office) VALUES ('By-ThoughtWorks', 'sydney');
INSERT INTO meetup_groups(group_name, office) VALUES ('SydCSS', 'sydney');
INSERT INTO meetup_groups(group_name, office) VALUES ('Sydney-Startup-Society', 'sydney');
INSERT INTO meetup_groups(group_name, office) VALUES ('Design-System', 'sydney');
INSERT INTO meetup_groups(group_name, office) VALUES ('Enterprise-UX-Sydney', 'sydney');
INSERT INTO meetup_groups(group_name, office) VALUES ('FuckUp-Nights-Sydney', 'sydney');
INSERT INTO meetup_groups(group_name, office) VALUES ('sydneymachinelearning', 'sydney');
INSERT INTO meetup_groups(group_name, office) VALUES ('dsai-syd', 'sydney');
INSERT INTO meetup_groups(group_name, office) VALUES ('apache-kafka-sydney', 'sydney');
INSERT INTO meetup_groups(group_name, office) VALUES ('Software-Crafters-Sydney', 'sydney');
INSERT INTO meetup_groups(group_name, office) VALUES ('Sydney-DBT-Meetup', 'sydney');
INSERT INTO meetup_groups(group_name, office) VALUES ('MusesCodeJS', 'sydney');
INSERT INTO meetup_groups(group_name, office) VALUES ('Sydney-Data-Engineering-Meetup', 'sydney');
INSERT INTO meetup_groups(group_name, office) VALUES ('Code-Like-A-Girl-Sydney', 'sydney');
INSERT INTO meetup_groups(group_name, office) VALUES ('ProductTalkSydney', 'sydney');
INSERT INTO meetup_groups(group_name, office) VALUES ('Sydney-Creative-Customer-Experience-CCX', 'sydney');

create table tokens
(
    id               text                                not null,
    create_timestamp timestamp DEFAULT CURRENT_TIMESTAMP not null,
    update_timestamp timestamp DEFAULT CURRENT_TIMESTAMP not null,
    office      	 text                                not null,
    author           text                                not null,
    access_token     text                                not null,
    refresh_token    text                                not null,
    token_type       text                                not null,
    expiry_date      text                                not null,
    primary key (id)
);

insert into tokens(id, office, author, access_token, refresh_token, token_type, expiry_date) values('79e76b4c-240d-11eb-8677-af8a570f7ed0', 'sydney', 'Issy', '123', '123', 'token', '2020-01-01');
