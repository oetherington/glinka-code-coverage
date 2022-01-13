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
{"lineNum":"   19","line":"const activeTag = std.meta.activeTag;"},
{"lineNum":"   20","line":""},
{"lineNum":"   21","line":"pub fn memEql(comptime T: type, a: []const T, b: []const T) bool {","class":"linePartCov","hits":"3","order":"241","possible_hits":"10",},
{"lineNum":"   22","line":"    if (a.len != b.len)","class":"linePartCov","hits":"6","order":"242","possible_hits":"20",},
{"lineNum":"   23","line":"        return false;","class":"lineNoCov","hits":"0","possible_hits":"10",},
{"lineNum":"   24","line":"    if (a.ptr == b.ptr)","class":"linePartCov","hits":"6","order":"243","possible_hits":"20",},
{"lineNum":"   25","line":"        return true;","class":"linePartCov","hits":"3","order":"922","possible_hits":"10",},
{"lineNum":"   26","line":"    for (a) |item, index| {","class":"linePartCov","hits":"6","order":"244","possible_hits":"20",},
{"lineNum":"   27","line":"        switch (@typeInfo(T)) {"},
{"lineNum":"   28","line":"            .Struct => if (!b[index].eql(item)) return false,","class":"lineNoCov","hits":"0","possible_hits":"14",},
{"lineNum":"   29","line":"            else => if (b[index] != item) return false,","class":"linePartCov","hits":"3","order":"245","possible_hits":"6",},
{"lineNum":"   30","line":"        }"},
{"lineNum":"   31","line":"    }"},
{"lineNum":"   32","line":"    return true;","class":"linePartCov","hits":"3","order":"246","possible_hits":"10",},
{"lineNum":"   33","line":"}"},
{"lineNum":"   34","line":""},
{"lineNum":"   35","line":"/// This is the same as std.meta.eql except slices are compared with"},
{"lineNum":"   36","line":"/// std.mem.eql instead of a simple pointer comparison"},
{"lineNum":"   37","line":"pub fn eql(a: anytype, b: @TypeOf(a)) bool {","class":"linePartCov","hits":"27","order":"233","possible_hits":"69",},
{"lineNum":"   38","line":"    const T = @TypeOf(a);"},
{"lineNum":"   39","line":""},
{"lineNum":"   40","line":"    switch (@typeInfo(T)) {"},
{"lineNum":"   41","line":"        .Struct => |info| {"},
{"lineNum":"   42","line":"            inline for (info.fields) |field_info| {"},
{"lineNum":"   43","line":"                if (!eql(@field(a, field_info.name), @field(b, field_info.name))) return false;","class":"linePartCov","hits":"14","order":"239","possible_hits":"40",},
{"lineNum":"   44","line":"            }"},
{"lineNum":"   45","line":"            return true;","class":"linePartCov","hits":"14","order":"248","possible_hits":"43",},
{"lineNum":"   46","line":"        },"},
{"lineNum":"   47","line":"        .ErrorUnion => {"},
{"lineNum":"   48","line":"            if (a) |a_p| {"},
{"lineNum":"   49","line":"                if (b) |b_p| return eql(a_p, b_p) else |_| return false;"},
{"lineNum":"   50","line":"            } else |a_e| {"},
{"lineNum":"   51","line":"                if (b) |_| return false else |b_e| return a_e == b_e;"},
{"lineNum":"   52","line":"            }"},
{"lineNum":"   53","line":"        },"},
{"lineNum":"   54","line":"        .Union => |info| {"},
{"lineNum":"   55","line":"            if (info.tag_type) |UnionTag| {"},
{"lineNum":"   56","line":"                const tag_a = activeTag(a);","class":"linePartCov","hits":"2","order":"234","possible_hits":"3",},
{"lineNum":"   57","line":"                const tag_b = activeTag(b);","class":"linePartCov","hits":"2","order":"235","possible_hits":"3",},
{"lineNum":"   58","line":"                if (tag_a != tag_b) return false;","class":"linePartCov","hits":"2","order":"236","possible_hits":"3",},
{"lineNum":"   59","line":""},
{"lineNum":"   60","line":"                inline for (info.fields) |field_info| {"},
{"lineNum":"   61","line":"                    if (@field(UnionTag, field_info.name) == tag_a) {","class":"linePartCov","hits":"36","order":"237","possible_hits":"63",},
{"lineNum":"   62","line":"                        return eql(@field(a, field_info.name), @field(b, field_info.name));","class":"linePartCov","hits":"7","order":"238","possible_hits":"63",},
{"lineNum":"   63","line":"                    }"},
{"lineNum":"   64","line":"                }"},
{"lineNum":"   65","line":"                return false;","class":"lineNoCov","hits":"0","possible_hits":"3",},
{"lineNum":"   66","line":"            }"},
{"lineNum":"   67","line":""},
{"lineNum":"   68","line":"            @compileError(\"cannot compare untagged union type \" ++ @typeName(T));"},
{"lineNum":"   69","line":"        },"},
{"lineNum":"   70","line":"        .Array => {"},
{"lineNum":"   71","line":"            if (a.len != b.len) return false;"},
{"lineNum":"   72","line":"            for (a) |e, i|"},
{"lineNum":"   73","line":"                if (!eql(e, b[i])) return false;"},
{"lineNum":"   74","line":"            return true;"},
{"lineNum":"   75","line":"        },"},
{"lineNum":"   76","line":"        .Vector => |info| {"},
{"lineNum":"   77","line":"            var i: usize = 0;"},
{"lineNum":"   78","line":"            while (i < info.len) : (i += 1) {"},
{"lineNum":"   79","line":"                if (!eql(a[i], b[i])) return false;"},
{"lineNum":"   80","line":"            }"},
{"lineNum":"   81","line":"            return true;"},
{"lineNum":"   82","line":"        },"},
{"lineNum":"   83","line":"        .Pointer => |info| {"},
{"lineNum":"   84","line":"            return switch (info.size) {","class":"linePartCov","hits":"5","order":"247","possible_hits":"12",},
{"lineNum":"   85","line":"                .One, .Many, .C => a == b,","class":"lineCov","hits":"2","order":"926","possible_hits":"2",},
{"lineNum":"   86","line":"                .Slice => memEql(info.child, a, b),","class":"linePartCov","hits":"3","order":"240","possible_hits":"10",},
{"lineNum":"   87","line":"            };"},
{"lineNum":"   88","line":"        },"},
{"lineNum":"   89","line":"        .Optional => {"},
{"lineNum":"   90","line":"            if (a == null and b == null) return true;","class":"linePartCov","hits":"2","order":"923","possible_hits":"4",},
{"lineNum":"   91","line":"            if (a == null or b == null) return false;","class":"linePartCov","hits":"2","order":"924","possible_hits":"4",},
{"lineNum":"   92","line":"            return eql(a.?, b.?);","class":"linePartCov","hits":"2","order":"925","possible_hits":"4",},
{"lineNum":"   93","line":"        },"},
{"lineNum":"   94","line":"        else => return a == b,","class":"linePartCov","hits":"4","order":"921","possible_hits":"7",},
{"lineNum":"   95","line":"    }"},
{"lineNum":"   96","line":"}"},
]};
var percent_low = 25;var percent_high = 75;
var header = { "command" : "test", "date" : "2022-01-13 17:41:24", "instrumented" : 25, "covered" : 22,};
var merged_data = [];
