var data = {lines:[
{"lineNum":"    1","line":"// glinka"},
{"lineNum":"    2","line":"// Copyright (C) 2021-2022 Ollie Etherington"},
{"lineNum":"    3","line":"// <www.etherington.io>"},
{"lineNum":"    4","line":"//"},
{"lineNum":"    5","line":"// This program is free software: you can redistribute it and/or modify"},
{"lineNum":"    6","line":"// it under the terms of the GNU Affero General Public License as published"},
{"lineNum":"    7","line":"// by the Free Software Foundation, either version 3 of the License, or"},
{"lineNum":"    8","line":"// (at your option) any later version."},
{"lineNum":"    9","line":"//"},
{"lineNum":"   10","line":"// This program is distributed in the hope that it will be useful,"},
{"lineNum":"   11","line":"// but WITHOUT ANY WARRANTY; without even the implied warranty of"},
{"lineNum":"   12","line":"// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the"},
{"lineNum":"   13","line":"// GNU Affero General Public License for more details."},
{"lineNum":"   14","line":"//"},
{"lineNum":"   15","line":"// You should have received a copy of the GNU Affero General Public License"},
{"lineNum":"   16","line":"// along with this program. If not, see <http://www.gnu.org/licenses/>."},
{"lineNum":"   17","line":""},
{"lineNum":"   18","line":"const std = @import(\"std\");"},
{"lineNum":"   19","line":"const genericEql = @import(\"../generic_eql.zig\").eql;"},
{"lineNum":"   20","line":"const Type = @import(\"type.zig\").Type;"},
{"lineNum":"   21","line":"const Visibility = @import(\"../visibility.zig\").Visibility;"},
{"lineNum":"   22","line":""},
{"lineNum":"   23","line":"pub const ClassType = struct {"},
{"lineNum":"   24","line":"    pub const Member = struct {"},
{"lineNum":"   25","line":"        // TODO: static, readonly, initialization values"},
{"lineNum":"   26","line":"        name: []const u8,"},
{"lineNum":"   27","line":"        ty: Type.Ptr,"},
{"lineNum":"   28","line":"        visibility: Visibility,"},
{"lineNum":"   29","line":""},
{"lineNum":"   30","line":"        pub fn eql(a: Member, b: Member) bool {","class":"lineCov","hits":"1","order":"2072","possible_hits":"1",},
{"lineNum":"   31","line":"            return genericEql(a, b);","class":"lineCov","hits":"1","order":"2073","possible_hits":"1",},
{"lineNum":"   32","line":"        }"},
{"lineNum":"   33","line":"    };"},
{"lineNum":"   34","line":""},
{"lineNum":"   35","line":"    super: ?Type.Ptr,"},
{"lineNum":"   36","line":"    name: []const u8,"},
{"lineNum":"   37","line":"    members: []Member,"},
{"lineNum":"   38","line":""},
{"lineNum":"   39","line":"    pub fn new(","class":"lineCov","hits":"1","order":"1978","possible_hits":"1",},
{"lineNum":"   40","line":"        super: ?Type.Ptr,"},
{"lineNum":"   41","line":"        name: []const u8,"},
{"lineNum":"   42","line":"        members: []Member,"},
{"lineNum":"   43","line":"    ) ClassType {"},
{"lineNum":"   44","line":"        if (super) |spr|","class":"lineCov","hits":"2","order":"1979","possible_hits":"2",},
{"lineNum":"   45","line":"            std.debug.assert(spr.getType() == .Class);","class":"lineCov","hits":"1","order":"2091","possible_hits":"1",},
{"lineNum":"   46","line":""},
{"lineNum":"   47","line":"        return ClassType{","class":"lineCov","hits":"1","order":"1983","possible_hits":"1",},
{"lineNum":"   48","line":"            .super = super,","class":"lineCov","hits":"1","order":"1980","possible_hits":"1",},
{"lineNum":"   49","line":"            .name = name,","class":"lineCov","hits":"1","order":"1981","possible_hits":"1",},
{"lineNum":"   50","line":"            .members = members,","class":"lineCov","hits":"1","order":"1982","possible_hits":"1",},
{"lineNum":"   51","line":"        };"},
{"lineNum":"   52","line":"    }"},
{"lineNum":"   53","line":""},
{"lineNum":"   54","line":"    pub fn hash(self: ClassType) usize {","class":"lineCov","hits":"1","order":"2101","possible_hits":"1",},
{"lineNum":"   55","line":"        var result: usize = if (self.super) |super|","class":"lineCov","hits":"2","order":"2102","possible_hits":"2",},
{"lineNum":"   56","line":"            super.hash()","class":"lineCov","hits":"1","order":"2112","possible_hits":"1",},
{"lineNum":"   57","line":"        else"},
{"lineNum":"   58","line":"            0x0e28e786568bc7a6;","class":"lineCov","hits":"1","order":"2103","possible_hits":"1",},
{"lineNum":"   59","line":""},
{"lineNum":"   60","line":"        result ^= std.hash.Wyhash.hash(0, self.name);","class":"lineCov","hits":"1","order":"2104","possible_hits":"1",},
{"lineNum":"   61","line":""},
{"lineNum":"   62","line":"        for (self.members) |mem| {","class":"lineCov","hits":"2","order":"2105","possible_hits":"2",},
{"lineNum":"   63","line":"            result ^= std.hash.Wyhash.hash(0, mem.name);","class":"lineCov","hits":"1","order":"2106","possible_hits":"1",},
{"lineNum":"   64","line":"            result ^= @ptrToInt(mem.ty);","class":"lineCov","hits":"1","order":"2107","possible_hits":"1",},
{"lineNum":"   65","line":"            result += @enumToInt(mem.visibility);","class":"linePartCov","hits":"1","order":"2108","possible_hits":"2",},
{"lineNum":"   66","line":"        }"},
{"lineNum":"   67","line":""},
{"lineNum":"   68","line":"        return result;","class":"lineCov","hits":"1","order":"2109","possible_hits":"1",},
{"lineNum":"   69","line":"    }"},
{"lineNum":"   70","line":""},
{"lineNum":"   71","line":"    pub fn write(self: ClassType, writer: anytype) !void {","class":"linePartCov","hits":"2","order":"1989","possible_hits":"4",},
{"lineNum":"   72","line":"        try writer.print(\"class {s}\", .{self.name});","class":"linePartCov","hits":"1","order":"1990","possible_hits":"2",},
{"lineNum":"   73","line":"    }"},
{"lineNum":"   74","line":""},
{"lineNum":"   75","line":"    // TODO: Account for private and protected members"},
{"lineNum":"   76","line":"    pub fn getNamedMember(","class":"lineCov","hits":"1","order":"2128","possible_hits":"1",},
{"lineNum":"   77","line":"        self: ClassType,"},
{"lineNum":"   78","line":"        name: []const u8,"},
{"lineNum":"   79","line":"    ) ?Member {"},
{"lineNum":"   80","line":"        for (self.members) |member|","class":"lineCov","hits":"2","order":"2129","possible_hits":"2",},
{"lineNum":"   81","line":"            if (std.mem.eql(u8, member.name, name))","class":"lineCov","hits":"2","order":"2130","possible_hits":"2",},
{"lineNum":"   82","line":"                return member;","class":"lineCov","hits":"1","order":"2131","possible_hits":"1",},
{"lineNum":"   83","line":""},
{"lineNum":"   84","line":"        if (self.super) |super|","class":"lineCov","hits":"2","order":"2136","possible_hits":"2",},
{"lineNum":"   85","line":"            return super.Class.getNamedMember(name);","class":"lineCov","hits":"2","order":"2137","possible_hits":"2",},
{"lineNum":"   86","line":""},
{"lineNum":"   87","line":"        return null;","class":"lineCov","hits":"1","order":"2142","possible_hits":"1",},
{"lineNum":"   88","line":"    }"},
{"lineNum":"   89","line":"};"},
{"lineNum":"   90","line":""},
{"lineNum":"   91","line":"test \"can check ClassType.Member equality\" {","class":"lineCov","hits":"2","order":"2053","possible_hits":"2",},
{"lineNum":"   92","line":"    const number = Type.newNumber();","class":"lineCov","hits":"1","order":"2054","possible_hits":"1",},
{"lineNum":"   93","line":"    const boolean = Type.newBoolean();","class":"lineCov","hits":"1","order":"2055","possible_hits":"1",},
{"lineNum":"   94","line":"    const a = ClassType.Member{"},
{"lineNum":"   95","line":"        .name = \"a\",","class":"lineCov","hits":"1","order":"2057","possible_hits":"1",},
{"lineNum":"   96","line":"        .ty = &number,","class":"lineCov","hits":"1","order":"2056","possible_hits":"1",},
{"lineNum":"   97","line":"        .visibility = .Public,","class":"lineCov","hits":"1","order":"2058","possible_hits":"1",},
{"lineNum":"   98","line":"    };"},
{"lineNum":"   99","line":"    const b = ClassType.Member{"},
{"lineNum":"  100","line":"        .name = \"a\",","class":"lineCov","hits":"1","order":"2060","possible_hits":"1",},
{"lineNum":"  101","line":"        .ty = &number,","class":"lineCov","hits":"1","order":"2059","possible_hits":"1",},
{"lineNum":"  102","line":"        .visibility = .Public,","class":"lineCov","hits":"1","order":"2061","possible_hits":"1",},
{"lineNum":"  103","line":"    };"},
{"lineNum":"  104","line":"    const c = ClassType.Member{"},
{"lineNum":"  105","line":"        .name = \"b\",","class":"lineCov","hits":"1","order":"2063","possible_hits":"1",},
{"lineNum":"  106","line":"        .ty = &number,","class":"lineCov","hits":"1","order":"2062","possible_hits":"1",},
{"lineNum":"  107","line":"        .visibility = .Public,","class":"lineCov","hits":"1","order":"2064","possible_hits":"1",},
{"lineNum":"  108","line":"    };"},
{"lineNum":"  109","line":"    const d = ClassType.Member{"},
{"lineNum":"  110","line":"        .name = \"a\",","class":"lineCov","hits":"1","order":"2066","possible_hits":"1",},
{"lineNum":"  111","line":"        .ty = &boolean,","class":"lineCov","hits":"1","order":"2065","possible_hits":"1",},
{"lineNum":"  112","line":"        .visibility = .Public,","class":"lineCov","hits":"1","order":"2067","possible_hits":"1",},
{"lineNum":"  113","line":"    };"},
{"lineNum":"  114","line":"    const e = ClassType.Member{"},
{"lineNum":"  115","line":"        .name = \"a\",","class":"lineCov","hits":"1","order":"2069","possible_hits":"1",},
{"lineNum":"  116","line":"        .ty = &number,","class":"lineCov","hits":"1","order":"2068","possible_hits":"1",},
{"lineNum":"  117","line":"        .visibility = .Protected,","class":"lineCov","hits":"1","order":"2070","possible_hits":"1",},
{"lineNum":"  118","line":"    };"},
{"lineNum":"  119","line":""},
{"lineNum":"  120","line":"    try std.testing.expect(a.eql(a));","class":"lineCov","hits":"1","order":"2071","possible_hits":"1",},
{"lineNum":"  121","line":"    try std.testing.expect(a.eql(b));","class":"lineCov","hits":"1","order":"2074","possible_hits":"1",},
{"lineNum":"  122","line":"    try std.testing.expect(!a.eql(c));","class":"lineCov","hits":"1","order":"2075","possible_hits":"1",},
{"lineNum":"  123","line":"    try std.testing.expect(!a.eql(d));","class":"lineCov","hits":"1","order":"2076","possible_hits":"1",},
{"lineNum":"  124","line":"    try std.testing.expect(!a.eql(e));","class":"lineCov","hits":"1","order":"2077","possible_hits":"1",},
{"lineNum":"  125","line":"}"},
{"lineNum":"  126","line":""},
{"lineNum":"  127","line":"test \"can hash a ClassType\" {","class":"lineCov","hits":"2","order":"2078","possible_hits":"2",},
{"lineNum":"  128","line":"    const num = Type.newNumber();","class":"lineCov","hits":"1","order":"2079","possible_hits":"1",},
{"lineNum":"  129","line":"    const str = Type.newString();","class":"lineCov","hits":"1","order":"2080","possible_hits":"1",},
{"lineNum":"  130","line":""},
{"lineNum":"  131","line":"    const a = Type.ClassType.new(null, \"A\", &[_]Type.ClassType.Member{","class":"lineCov","hits":"1","order":"2083","possible_hits":"1",},
{"lineNum":"  132","line":"        Type.ClassType.Member{ .name = \"a\", .ty = &num, .visibility = .Public },","class":"lineCov","hits":"1","order":"2081","possible_hits":"1",},
{"lineNum":"  133","line":"        Type.ClassType.Member{ .name = \"b\", .ty = &str, .visibility = .Public },","class":"lineCov","hits":"1","order":"2082","possible_hits":"1",},
{"lineNum":"  134","line":"    });"},
{"lineNum":"  135","line":"    const b = Type.ClassType.new(null, \"A\", &[_]Type.ClassType.Member{","class":"lineCov","hits":"1","order":"2086","possible_hits":"1",},
{"lineNum":"  136","line":"        Type.ClassType.Member{ .name = \"a\", .ty = &num, .visibility = .Public },","class":"lineCov","hits":"1","order":"2084","possible_hits":"1",},
{"lineNum":"  137","line":"        Type.ClassType.Member{ .name = \"b\", .ty = &str, .visibility = .Public },","class":"lineCov","hits":"1","order":"2085","possible_hits":"1",},
{"lineNum":"  138","line":"    });"},
{"lineNum":"  139","line":"    const super = Type.newClass(a);","class":"lineCov","hits":"1","order":"2087","possible_hits":"1",},
{"lineNum":"  140","line":"    const c = Type.ClassType.new(&super, \"A\", &[_]Type.ClassType.Member{","class":"lineCov","hits":"1","order":"2090","possible_hits":"1",},
{"lineNum":"  141","line":"        Type.ClassType.Member{ .name = \"a\", .ty = &num, .visibility = .Public },","class":"lineCov","hits":"1","order":"2088","possible_hits":"1",},
{"lineNum":"  142","line":"        Type.ClassType.Member{ .name = \"b\", .ty = &str, .visibility = .Public },","class":"lineCov","hits":"1","order":"2089","possible_hits":"1",},
{"lineNum":"  143","line":"    });"},
{"lineNum":"  144","line":"    const d = Type.ClassType.new(null, \"B\", &[_]Type.ClassType.Member{","class":"lineCov","hits":"1","order":"2094","possible_hits":"1",},
{"lineNum":"  145","line":"        Type.ClassType.Member{ .name = \"a\", .ty = &num, .visibility = .Public },","class":"lineCov","hits":"1","order":"2092","possible_hits":"1",},
{"lineNum":"  146","line":"        Type.ClassType.Member{ .name = \"b\", .ty = &str, .visibility = .Public },","class":"lineCov","hits":"1","order":"2093","possible_hits":"1",},
{"lineNum":"  147","line":"    });"},
{"lineNum":"  148","line":"    const e = Type.ClassType.new(null, \"B\", &[_]Type.ClassType.Member{","class":"lineCov","hits":"1","order":"2096","possible_hits":"1",},
{"lineNum":"  149","line":"        Type.ClassType.Member{ .name = \"a\", .ty = &num, .visibility = .Public },","class":"lineCov","hits":"1","order":"2095","possible_hits":"1",},
{"lineNum":"  150","line":"    });"},
{"lineNum":"  151","line":"    const f = Type.ClassType.new(null, \"B\", &[_]Type.ClassType.Member{","class":"lineCov","hits":"1","order":"2099","possible_hits":"1",},
{"lineNum":"  152","line":"        Type.ClassType.Member{ .name = \"a\", .ty = &num, .visibility = .Public },","class":"lineCov","hits":"1","order":"2097","possible_hits":"1",},
{"lineNum":"  153","line":"        Type.ClassType.Member{ .name = \"b\", .ty = &num, .visibility = .Public },","class":"lineCov","hits":"1","order":"2098","possible_hits":"1",},
{"lineNum":"  154","line":"    });"},
{"lineNum":"  155","line":""},
{"lineNum":"  156","line":"    try std.testing.expectEqual(a.hash(), a.hash());","class":"lineCov","hits":"1","order":"2100","possible_hits":"1",},
{"lineNum":"  157","line":"    try std.testing.expectEqual(a.hash(), b.hash());","class":"lineCov","hits":"1","order":"2110","possible_hits":"1",},
{"lineNum":"  158","line":"    try std.testing.expect(a.hash() != c.hash());","class":"lineCov","hits":"1","order":"2111","possible_hits":"1",},
{"lineNum":"  159","line":"    try std.testing.expect(a.hash() != d.hash());","class":"lineCov","hits":"1","order":"2114","possible_hits":"1",},
{"lineNum":"  160","line":"    try std.testing.expect(a.hash() != e.hash());","class":"lineCov","hits":"1","order":"2115","possible_hits":"1",},
{"lineNum":"  161","line":"    try std.testing.expect(a.hash() != f.hash());","class":"lineCov","hits":"1","order":"2116","possible_hits":"1",},
{"lineNum":"  162","line":"}"},
{"lineNum":"  163","line":""},
{"lineNum":"  164","line":"test \"can retrieve ClassType member by name\" {","class":"lineCov","hits":"2","order":"2117","possible_hits":"2",},
{"lineNum":"  165","line":"    const num = Type.newNumber();","class":"lineCov","hits":"1","order":"2118","possible_hits":"1",},
{"lineNum":"  166","line":"    const str = Type.newString();","class":"lineCov","hits":"1","order":"2119","possible_hits":"1",},
{"lineNum":"  167","line":""},
{"lineNum":"  168","line":"    const c0 = Type.ClassType.new(null, \"A\", &[_]Type.ClassType.Member{","class":"lineCov","hits":"1","order":"2122","possible_hits":"1",},
{"lineNum":"  169","line":"        Type.ClassType.Member{ .name = \"a\", .ty = &num, .visibility = .Public },","class":"lineCov","hits":"1","order":"2120","possible_hits":"1",},
{"lineNum":"  170","line":"        Type.ClassType.Member{ .name = \"b\", .ty = &str, .visibility = .Public },","class":"lineCov","hits":"1","order":"2121","possible_hits":"1",},
{"lineNum":"  171","line":"    });"},
{"lineNum":"  172","line":"    const super = Type.newClass(c0);","class":"lineCov","hits":"1","order":"2123","possible_hits":"1",},
{"lineNum":"  173","line":"    const c1 = Type.ClassType.new(&super, \"B\", &[_]Type.ClassType.Member{","class":"lineCov","hits":"1","order":"2126","possible_hits":"1",},
{"lineNum":"  174","line":"        Type.ClassType.Member{ .name = \"c\", .ty = &num, .visibility = .Public },","class":"lineCov","hits":"1","order":"2124","possible_hits":"1",},
{"lineNum":"  175","line":"        Type.ClassType.Member{ .name = \"d\", .ty = &str, .visibility = .Public },","class":"lineCov","hits":"1","order":"2125","possible_hits":"1",},
{"lineNum":"  176","line":"    });"},
{"lineNum":"  177","line":""},
{"lineNum":"  178","line":"    const a = c0.getNamedMember(\"a\");","class":"lineCov","hits":"1","order":"2127","possible_hits":"1",},
{"lineNum":"  179","line":"    try std.testing.expect(a != null);","class":"lineCov","hits":"1","order":"2132","possible_hits":"1",},
{"lineNum":"  180","line":"    try std.testing.expectEqualStrings(\"a\", a.?.name);","class":"linePartCov","hits":"1","order":"2133","possible_hits":"2",},
{"lineNum":"  181","line":"    try std.testing.expectEqual(Type.Type.Number, a.?.ty.getType());","class":"linePartCov","hits":"1","order":"2134","possible_hits":"2",},
{"lineNum":"  182","line":""},
{"lineNum":"  183","line":"    const b = c1.getNamedMember(\"b\");","class":"lineCov","hits":"1","order":"2135","possible_hits":"1",},
{"lineNum":"  184","line":"    try std.testing.expect(b != null);","class":"lineCov","hits":"1","order":"2138","possible_hits":"1",},
{"lineNum":"  185","line":"    try std.testing.expectEqualStrings(\"b\", b.?.name);","class":"linePartCov","hits":"1","order":"2139","possible_hits":"2",},
{"lineNum":"  186","line":"    try std.testing.expectEqual(Type.Type.String, b.?.ty.getType());","class":"linePartCov","hits":"1","order":"2140","possible_hits":"2",},
{"lineNum":"  187","line":""},
{"lineNum":"  188","line":"    const c = c0.getNamedMember(\"c\");","class":"lineCov","hits":"1","order":"2141","possible_hits":"1",},
{"lineNum":"  189","line":"    try std.testing.expect(c == null);","class":"lineCov","hits":"1","order":"2143","possible_hits":"1",},
{"lineNum":"  190","line":"}"},
]};
var percent_low = 25;var percent_high = 75;
var header = { "command" : "test", "date" : "2022-02-01 20:02:57", "instrumented" : 98, "covered" : 98,};
var merged_data = [];
